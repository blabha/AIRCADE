"""
(Ai)rcade Print Server — Linux ESC/POS
Runs on Raspberry Pi 4, writes directly to /dev/usb/lp0.
No CUPS, no Windows libraries required.

Usage:
    pip install flask flask-cors pillow
    python3 print_server_linux.py
"""

import base64
import io
import os
import struct
import sys

from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image

# ── Config ────────────────────────────────────────────────────────────────────

USB_DEVICE = '/dev/usb/lp0'
LABEL_W    = 812    # 4 inches at 203 DPI
LABEL_H    = 1218   # 6 inches at 203 DPI

# ── ESC/POS helpers ───────────────────────────────────────────────────────────

ESC_INIT      = b'\x1b\x40'          # Initialize printer
ESC_ALIGN_L   = b'\x1b\x61\x00'     # Left align
GS_CUT        = b'\x1d\x56\x41\x00' # Full cut

def _image_to_escpos(img: Image.Image) -> bytes:
    """Convert a 1-bit PIL image to GS v 0 raster ESC/POS bytes."""
    width, height = img.size
    # Width must be a multiple of 8 for byte packing
    width_bytes = (width + 7) // 8

    # GS v 0: b'\x1d\x76\x30\x00' + xL xH yL yH + raster data
    header = (
        b'\x1d\x76\x30\x00'
        + struct.pack('<H', width_bytes)
        + struct.pack('<H', height)
    )

    pixels = img.load()
    raster = bytearray()
    for y in range(height):
        for byte_x in range(width_bytes):
            byte_val = 0
            for bit in range(8):
                x = byte_x * 8 + bit
                if x < width:
                    # PIL mode '1': 0 = black, 255 = white
                    # ESC/POS raster: 1 = black dot
                    if pixels[x, y] == 0:
                        byte_val |= (1 << (7 - bit))
            raster.append(byte_val)

    return header + bytes(raster)


def _send_to_printer(data: bytes) -> None:
    """Write raw bytes to the USB printer device."""
    with open(USB_DEVICE, 'wb') as dev:
        dev.write(data)
        dev.flush()


def _build_print_job(img: Image.Image) -> bytes:
    """Assemble full ESC/POS job: init + image + cut."""
    # Convert RGBA → RGB on white background
    if img.mode == 'RGBA':
        bg = Image.new('RGB', img.size, (255, 255, 255))
        bg.paste(img, mask=img.split()[3])
        img = bg
    elif img.mode != 'RGB':
        img = img.convert('RGB')

    # Resize to label dimensions
    img = img.resize((LABEL_W, LABEL_H), Image.LANCZOS)

    # Convert to 1-bit black and white (dithered)
    img_bw = img.convert('1')

    return ESC_INIT + ESC_ALIGN_L + _image_to_escpos(img_bw) + GS_CUT


def _test_image() -> Image.Image:
    """Generate a simple test label image (white with black text block)."""
    img = Image.new('RGB', (LABEL_W, LABEL_H), (255, 255, 255))
    # Draw a black rectangle banner at top (simple, no font dependency)
    pixels = img.load()
    # Top banner: rows 0-120, full width
    for y in range(120):
        for x in range(LABEL_W):
            pixels[x, y] = (0, 0, 0)
    # Small white gap rows 120-130
    # Second block: rows 130-200
    for y in range(130, 200):
        for x in range(40, LABEL_W - 40):
            pixels[x, y] = (0, 0, 0)
    # Border rectangle
    for x in range(LABEL_W):
        for y in range(4):
            pixels[x, LABEL_H - 1 - y] = (0, 0, 0)
            pixels[x, y + 250] = (0, 0, 0)
    return img

# ── Flask app ─────────────────────────────────────────────────────────────────

app = Flask(__name__)
CORS(app)


@app.route('/health', methods=['GET'])
def health():
    device_ok = os.path.exists(USB_DEVICE)
    return jsonify({
        'status': 'ok',
        'device': USB_DEVICE,
        'device_found': device_ok,
    })


@app.route('/test', methods=['GET'])
def test_print():
    if not os.path.exists(USB_DEVICE):
        return jsonify({'status': 'error', 'message': f'{USB_DEVICE} not found'}), 503

    try:
        img = _test_image()
        job = _build_print_job(img)
        _send_to_printer(job)
        return jsonify({'status': 'ok', 'message': 'Test label sent to printer'})
    except PermissionError:
        return jsonify({
            'status': 'error',
            'message': f'Permission denied on {USB_DEVICE}. Run: sudo chmod a+rw {USB_DEVICE}',
        }), 500
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


@app.route('/print', methods=['POST'])
def print_label():
    if not os.path.exists(USB_DEVICE):
        return jsonify({'status': 'error', 'message': f'{USB_DEVICE} not found'}), 503

    data = request.get_json(silent=True)
    if not data or 'image' not in data:
        return jsonify({'status': 'error', 'message': 'Missing image field in JSON body'}), 400

    try:
        # Strip data URL prefix if present: "data:image/png;base64,..."
        raw = data['image']
        if ',' in raw:
            raw = raw.split(',', 1)[1]
        img_bytes = base64.b64decode(raw)
        img = Image.open(io.BytesIO(img_bytes))

        job = _build_print_job(img)
        _send_to_printer(job)
        return jsonify({'status': 'ok', 'message': 'Label sent to printer'})

    except PermissionError:
        return jsonify({
            'status': 'error',
            'message': f'Permission denied on {USB_DEVICE}. Run: sudo chmod a+rw {USB_DEVICE}',
        }), 500
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


# ── Entry point ───────────────────────────────────────────────────────────────

if __name__ == '__main__':
    print('(Ai)rcade Print Server — Linux ESC/POS')
    print(f'Device: {USB_DEVICE}')
    print('Running on http://localhost:5000')
    print('Test: http://localhost:5000/test')

    if not os.path.exists(USB_DEVICE):
        print(f'\nWARNING: {USB_DEVICE} not found.')
        print('  — Check that the printer is plugged in via USB.')
        print('  — If it appears as /dev/usb/lp1, update USB_DEVICE in this file.')
        print(f'  — To grant access without sudo: sudo chmod a+rw {USB_DEVICE}')
        print()
    else:
        print(f'  ✓ {USB_DEVICE} found\n')

    app.run(host='0.0.0.0', port=5000, debug=False)
