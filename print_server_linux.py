"""
(Ai)rcade Print Server — TSPL direct USB
Bypasses CUPS entirely. Writes TSPL BITMAP commands directly to /dev/usb/lp0.

Usage:
    pip install flask flask-cors pillow
    sudo python3 print_server_linux.py
"""

import base64
import io
import os
import struct
import subprocess

from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image

# ── Config ────────────────────────────────────────────────────────────────────

USB_DEVICE  = '/dev/usb/lp0'
LABEL_W_MM  = 101.5
LABEL_H_MM  = 152
LABEL_W_PX  = 812    # 4 in at 203 DPI
LABEL_H_PX  = 1218   # 6 in at 203 DPI

# ── Image helpers ─────────────────────────────────────────────────────────────

def _prepare_image(img: Image.Image) -> Image.Image:
    """Convert RGBA → RGB on white background, resize to label dimensions."""
    if img.mode == 'RGBA':
        bg = Image.new('RGB', img.size, (255, 255, 255))
        bg.paste(img, mask=img.split()[3])
        img = bg
    elif img.mode != 'RGB':
        img = img.convert('RGB')
    return img.resize((LABEL_W_PX, LABEL_H_PX), Image.LANCZOS)


def _image_to_tspl_bitmap(img: Image.Image) -> bytes:
    """
    Convert a PIL image to raw TSPL bitmap bytes.
    Pillow mode '1': 0 = black, 255 = white.
    TSPL: bit 1 = black dot, bit 0 = white dot — so invert.
    Pixels are packed MSB-first, 8 pixels per byte.
    """
    mono = img.convert('1')
    width, height = mono.size
    width_bytes = (width + 7) // 8
    rows = []
    for y in range(height):
        row = bytearray(width_bytes)
        for x in range(width):
            pixel = mono.getpixel((x, y))
            if pixel == 0:  # black in Pillow → set bit (black dot in TSPL)
                byte_index = x // 8
                bit_index  = 7 - (x % 8)  # MSB first
                row[byte_index] |= (1 << bit_index)
        rows.append(bytes(row))
    return b''.join(rows), width_bytes, height


def _send_to_printer(img: Image.Image) -> None:
    """Write TSPL commands and bitmap data directly to the USB device."""
    if not os.path.exists(USB_DEVICE):
        raise FileNotFoundError(f'{USB_DEVICE} not found — is the printer connected?')

    bitmap_data, width_bytes, height = _image_to_tspl_bitmap(img)

    with open(USB_DEVICE, 'wb') as dev:
        dev.write(f'SIZE {LABEL_W_MM} mm,{LABEL_H_MM} mm\r\n'.encode())
        dev.write(b'GAP 3 mm,0 mm\r\n')
        dev.write(b'DIRECTION 1\r\n')
        dev.write(b'CLS\r\n')
        dev.write(f'BITMAP 0,0,{width_bytes},{height},0,'.encode())
        dev.write(bitmap_data)
        dev.write(b'\r\nPRINT 1\r\n')
        dev.flush()

# ── Flask app ─────────────────────────────────────────────────────────────────

app = Flask(__name__)
CORS(app)


@app.route('/health', methods=['GET'])
def health():
    device_present = os.path.exists(USB_DEVICE)
    return jsonify({
        'status': 'ok',
        'usb_device': USB_DEVICE,
        'device_present': device_present,
    })


@app.route('/test', methods=['GET'])
def test_print():
    try:
        img = Image.new('RGB', (LABEL_W_PX, LABEL_H_PX), (255, 255, 255))
        pixels = img.load()
        for y in range(120):
            for x in range(LABEL_W_PX):
                pixels[x, y] = (0, 0, 0)
        _send_to_printer(img)
        return jsonify({'status': 'ok', 'message': 'Test label sent to printer'})
    except FileNotFoundError as e:
        return jsonify({'status': 'error', 'message': str(e)}), 503
    except PermissionError:
        return jsonify({'status': 'error', 'message': f'Permission denied on {USB_DEVICE} — run: sudo chmod a+rw {USB_DEVICE}'}), 503
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


@app.route('/print', methods=['POST'])
def print_label():
    data = request.get_json(silent=True)
    if not data or 'image' not in data:
        return jsonify({'status': 'error', 'message': 'Missing image field in JSON body'}), 400

    try:
        raw = data['image']
        if ',' in raw:
            raw = raw.split(',', 1)[1]
        img = Image.open(io.BytesIO(base64.b64decode(raw)))
        img = _prepare_image(img)
        _send_to_printer(img)
        return jsonify({'status': 'ok', 'message': 'Label sent to printer'})
    except FileNotFoundError as e:
        return jsonify({'status': 'error', 'message': str(e)}), 503
    except PermissionError:
        return jsonify({'status': 'error', 'message': f'Permission denied on {USB_DEVICE} — run: sudo chmod a+rw {USB_DEVICE}'}), 503
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


# ── Entry point ───────────────────────────────────────────────────────────────

if __name__ == '__main__':
    # Stop CUPS so it doesn't hold the USB device
    subprocess.run(['sudo', 'systemctl', 'stop', 'cups'], capture_output=True)
    subprocess.run(['sudo', 'chmod', 'a+rw', USB_DEVICE], capture_output=True)

    print('(Ai)rcade Print Server — TSPL direct USB')
    print(f'Device: {USB_DEVICE}')
    print('Running on http://localhost:5000')
    print('Test:    http://localhost:5000/test')
    print()
    app.run(host='0.0.0.0', port=5000, debug=False)
