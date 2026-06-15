"""
(Ai)rcade Print Server — Linux CUPS
Runs on Raspberry Pi 4, prints via CUPS to "aircade-printer".

Usage:
    pip install flask flask-cors pillow
    python3 print_server_linux.py
"""

import base64
import io
import os
import subprocess
import sys

from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image

# ── Config ────────────────────────────────────────────────────────────────────

PRINTER_NAME = "aircade-printer"
LABEL_W      = 812    # 4 inches at 203 DPI
LABEL_H      = 1218   # 6 inches at 203 DPI
TMP_PATH     = '/tmp/aircade_ticket.png'

# ── Image helpers ─────────────────────────────────────────────────────────────

def _prepare_image(img: Image.Image) -> Image.Image:
    """Convert RGBA → RGB on white background, resize to label dimensions."""
    if img.mode == 'RGBA':
        bg = Image.new('RGB', img.size, (255, 255, 255))
        bg.paste(img, mask=img.split()[3])
        img = bg
    elif img.mode != 'RGB':
        img = img.convert('RGB')
    return img.resize((LABEL_W, LABEL_H), Image.LANCZOS)


def _print_via_cups(path: str) -> None:
    """Send file to CUPS printer."""
    subprocess.run(
        [
            'lp', '-d', PRINTER_NAME,
            '-o', 'fit-to-page',
            '-o', 'Resolution=203dpi',
            path,
        ],
        check=True,
        capture_output=True,
        text=True,
    )

# ── Flask app ─────────────────────────────────────────────────────────────────

app = Flask(__name__)
CORS(app)


@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'ok',
        'printer': PRINTER_NAME,
    })


@app.route('/test', methods=['GET'])
def test_print():
    try:
        # White label with a black banner — no font dependency
        img = Image.new('RGB', (LABEL_W, LABEL_H), (255, 255, 255))
        pixels = img.load()
        for y in range(120):
            for x in range(LABEL_W):
                pixels[x, y] = (0, 0, 0)
        img.save(TMP_PATH)
        _print_via_cups(TMP_PATH)
        return jsonify({'status': 'ok', 'message': 'Test label sent to printer'})
    except subprocess.CalledProcessError as e:
        return jsonify({'status': 'error', 'message': e.stderr or str(e)}), 500
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
        img.save(TMP_PATH, 'PNG', optimize=False)
        _print_via_cups(TMP_PATH)
        return jsonify({'status': 'ok', 'message': 'Label sent to printer'})
    except subprocess.CalledProcessError as e:
        return jsonify({'status': 'error', 'message': e.stderr or str(e)}), 500
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


# ── Entry point ───────────────────────────────────────────────────────────────

if __name__ == '__main__':
    print('(Ai)rcade Print Server — CUPS')
    print(f'Printer: {PRINTER_NAME}')
    print('Running on http://localhost:5000')
    print('Test: http://localhost:5000/test')
    print()
    app.run(host='0.0.0.0', port=5000, debug=False)
