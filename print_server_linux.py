"""
(Ai)rcade Print Server — Linux PyUSB + TSPL
Bypasses CUPS and usblp kernel module entirely.
Uses PyUSB to send TSPL BITMAP commands directly to the printer.

Prerequisites:
    sudo pip3 install flask flask-cors pillow pyusb --break-system-packages
    sudo rmmod usblp   (run before starting this server)

Usage:
    sudo python3 print_server_linux.py
"""

import base64
import io
import os
import subprocess
import sys
import time

from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image

# ── Printer USB IDs ──────────────────────────────────────────────────────────
# Zhuhai Poskey Technology Co.,Ltd (Xprinter subsidiary)
# 4BARCODE 4B-2063C
VENDOR_ID  = 0x2D84
PRODUCT_ID = 0x471B

# ── Label dimensions ─────────────────────────────────────────────────────────
LABEL_W_MM = 101.5
LABEL_H_MM = 152
DPI        = 203
LABEL_W_PX = int(LABEL_W_MM / 25.4 * DPI)  # ~812
LABEL_H_PX = int(LABEL_H_MM / 25.4 * DPI)  # ~1218


def _find_printer():
    """Find the printer via PyUSB and return (device, out_endpoint)."""
    import usb.core
    import usb.util

    dev = usb.core.find(idVendor=VENDOR_ID, idProduct=PRODUCT_ID)
    if dev is None:
        raise RuntimeError(
            f'Printer not found (VID={VENDOR_ID:#06x} PID={PRODUCT_ID:#06x}). '
            'Is it plugged in? Did you run: sudo rmmod usblp?'
        )

    # Detach kernel driver if attached
    try:
        if dev.is_kernel_driver_active(0):
            dev.detach_kernel_driver(0)
    except Exception:
        pass

    # Set configuration
    try:
        dev.set_configuration()
    except Exception:
        pass

    # Find the OUT endpoint
    cfg = dev.get_active_configuration()
    intf = cfg[(0, 0)]

    import usb.util
    out_ep = usb.util.find_descriptor(
        intf,
        custom_match=lambda e: usb.util.endpoint_direction(e.bEndpointAddress)
        == usb.util.ENDPOINT_OUT,
    )
    if out_ep is None:
        raise RuntimeError('Could not find OUT endpoint on the printer.')

    return dev, out_ep


def _send_raw(out_ep, data: bytes, chunk_size: int = 1024):
    """Send raw bytes to the printer in chunks."""
    for i in range(0, len(data), chunk_size):
        out_ep.write(data[i : i + chunk_size])
    time.sleep(0.1)


def _prepare_image(img: Image.Image) -> Image.Image:
    """Convert to RGB on white background, resize to label dimensions."""
    if img.mode == 'RGBA':
        bg = Image.new('RGB', img.size, (255, 255, 255))
        bg.paste(img, mask=img.split()[3])
        img = bg
    elif img.mode != 'RGB':
        img = img.convert('RGB')
    return img.resize((LABEL_W_PX, LABEL_H_PX), Image.LANCZOS)


def _image_to_tspl_bitmap(img: Image.Image) -> tuple:
    """
    Convert a PIL image to TSPL BITMAP data.

    TSPL BITMAP format:
    - 1 bit per pixel, MSB first
    - 1 = black dot, 0 = white dot
    - Pillow mode '1': 0 = black, 255 = white (inverted)
    """
    mono = img.convert('1')
    width, height = mono.size
    width_bytes = (width + 7) // 8

    data = bytearray()
    for y in range(height):
        for byte_x in range(width_bytes):
            byte_val = 0
            for bit in range(8):
                x = byte_x * 8 + bit
                if x < width and mono.getpixel((x, y)) == 0:
                    byte_val |= (0x80 >> bit)
            data.append(byte_val)

    return bytes(data), width_bytes, height


def _print_image(img: Image.Image):
    """Send a PIL image to the printer as a TSPL BITMAP."""
    dev, out_ep = _find_printer()

    bitmap_data, width_bytes, height = _image_to_tspl_bitmap(img)

    # Build TSPL command sequence
    cmds = b''
    cmds += f'SIZE {LABEL_W_MM} mm, {LABEL_H_MM} mm\r\n'.encode()
    cmds += b'GAP 3 mm, 0 mm\r\n'
    cmds += b'DIRECTION 1\r\n'
    cmds += b'CLS\r\n'
    cmds += f'BITMAP 0,0,{width_bytes},{height},0,'.encode()

    # Send commands header
    _send_raw(out_ep, cmds)

    # Send bitmap data in chunks (large data)
    _send_raw(out_ep, bitmap_data, chunk_size=4096)

    # Send print command
    _send_raw(out_ep, b'\r\nPRINT 1\r\n')

    print(f'Printed image: {width_bytes * 8}x{height} px')


def _print_text_test():
    """Send a simple TSPL text command to verify the connection."""
    dev, out_ep = _find_printer()

    cmds = b''
    cmds += f'SIZE {LABEL_W_MM} mm, {LABEL_H_MM} mm\r\n'.encode()
    cmds += b'GAP 3 mm, 0 mm\r\n'
    cmds += b'DIRECTION 1\r\n'
    cmds += b'CLS\r\n'
    cmds += b'TEXT 50,200,"4",0,1,1,"(Ai)rcade"\r\n'
    cmds += b'TEXT 50,300,"3",0,1,1,"PRINT TEST OK"\r\n'
    cmds += b'TEXT 50,400,"2",0,1,1,"Printer is working!"\r\n'
    cmds += b'PRINT 1\r\n'

    _send_raw(out_ep, cmds)
    print('Text test sent to printer')


# ── Flask app ────────────────────────────────────────────────────────────────

app = Flask(__name__)
CORS(app)


@app.route('/health', methods=['GET'])
def health():
    try:
        dev, _ = _find_printer()
        return jsonify({'status': 'ok', 'printer': 'connected'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 503


@app.route('/test', methods=['GET'])
def test_print():
    try:
        _print_text_test()
        return jsonify({'status': 'ok', 'message': 'Test sent to printer'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


@app.route('/test-image', methods=['GET'])
def test_image_print():
    try:
        img = Image.new('RGB', (LABEL_W_PX, LABEL_H_PX), (255, 255, 255))
        from PIL import ImageDraw
        draw = ImageDraw.Draw(img)
        draw.rectangle([20, 20, LABEL_W_PX - 20, LABEL_H_PX - 20],
                       outline=(0, 0, 0), width=4)
        draw.rectangle([50, 50, LABEL_W_PX - 50, 200],
                       fill=(0, 0, 0))
        draw.text((100, 400), '(Ai)rcade', fill=(0, 0, 0))
        draw.text((100, 500), 'IMAGE TEST OK', fill=(0, 0, 0))
        _print_image(img)
        return jsonify({'status': 'ok', 'message': 'Image test sent'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


@app.route('/print', methods=['POST'])
def print_label():
    data = request.get_json(silent=True)
    if not data or 'image' not in data:
        return jsonify({
            'status': 'error',
            'message': 'Missing image field in JSON body',
        }), 400

    try:
        raw = data['image']
        if ',' in raw:
            raw = raw.split(',', 1)[1]
        img = Image.open(io.BytesIO(base64.b64decode(raw)))
        img = _prepare_image(img)
        _print_image(img)
        return jsonify({'status': 'ok', 'message': 'Ticket printed!'})
    except Exception as e:
        print(f'Print error: {e}')
        return jsonify({'status': 'error', 'message': str(e)}), 500


# ── Entry point ──────────────────────────────────────────────────────────────

if __name__ == '__main__':
    # Step 1: Stop CUPS (it holds the USB device)
    print('Stopping CUPS...')
    subprocess.run(['sudo', 'systemctl', 'stop', 'cups'],
                   capture_output=True)

    # Step 2: Unload usblp kernel module (it blocks PyUSB access)
    print('Unloading usblp module...')
    subprocess.run(['sudo', 'rmmod', 'usblp'], capture_output=True)

    # Wait for device to be released
    time.sleep(1)

    # Step 3: Verify printer connection
    print()
    print('=' * 50)
    print('  (Ai)rcade Print Server — PyUSB + TSPL')
    print(f'  Printer: 4BARCODE 4B-2063C')
    print(f'  VID={VENDOR_ID:#06x}  PID={PRODUCT_ID:#06x}')
    print(f'  Label: {LABEL_W_MM}mm x {LABEL_H_MM}mm @ {DPI}dpi')
    print('  Running on http://localhost:5000')
    print('  Test text:  http://localhost:5000/test')
    print('  Test image: http://localhost:5000/test-image')
    print('=' * 50)

    try:
        dev, ep = _find_printer()
        print(f'\n  Printer found! Endpoint: {ep.bEndpointAddress:#04x}')
    except Exception as e:
        print(f'\n  WARNING: {e}')
        print('  The server will start anyway — plug in the printer.')

    print()
    app.run(host='0.0.0.0', port=5000, debug=False)
