"""
AIRCADE Print Server
Runs locally on Windows, receives ticket image from browser,
sends it to the 4Barcode 4B-2063C label printer via USB.

Usage: python print_server.py
Runs on: http://localhost:5000
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import win32print
import win32ui
import win32con
from PIL import ImageWin
import base64
import io
import sys

app = Flask(__name__)
CORS(app)  # Allow requests from the browser (file:// or localhost)

PRINTER_NAME = "4BARCODE 4B-2063C"

# Label size: 4" x 6" at 203 DPI (standard thermal label printer resolution)
LABEL_W_INCHES = 4
LABEL_H_INCHES = 6
DPI = 203
LABEL_W_PX = LABEL_W_INCHES * DPI  # 812 px
LABEL_H_PX = LABEL_H_INCHES * DPI  # 1218 px


@app.route('/health', methods=['GET'])
def health():
    """Quick check that the server is running."""
    return jsonify({'status': 'ok', 'printer': PRINTER_NAME})


@app.route('/print', methods=['POST'])
def print_ticket():
    """
    Receives a base64-encoded PNG of the ticket card from the browser.
    Resizes it to label dimensions and sends it to the printer.

    Expected JSON body:
    {
        "image": "data:image/png;base64,iVBORw0KGgo..."
    }
    """
    try:
        data = request.get_json()
        if not data or 'image' not in data:
            return jsonify({'success': False, 'error': 'No image data received'}), 400

        # Strip the data URL prefix if present
        image_data = data['image']
        if ',' in image_data:
            image_data = image_data.split(',')[1]

        # Decode base64 to image
        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes))

        # Convert to RGB (printer needs RGB, not RGBA)
        if image.mode != 'RGB':
            background = Image.new('RGB', image.size, (255, 255, 255))
            if image.mode == 'RGBA':
                background.paste(image, mask=image.split()[3])
            else:
                background.paste(image)
            image = background

        # Resize to exact label dimensions maintaining aspect ratio
        image_aspect = image.width / image.height
        label_aspect = LABEL_W_PX / LABEL_H_PX

        if image_aspect > label_aspect:
            # Image is wider — fit to width
            new_w = LABEL_W_PX
            new_h = int(LABEL_W_PX / image_aspect)
        else:
            # Image is taller — fit to height
            new_h = LABEL_H_PX
            new_w = int(LABEL_H_PX * image_aspect)

        image = image.resize((new_w, new_h), Image.LANCZOS)

        # Center on white label canvas
        canvas = Image.new('RGB', (LABEL_W_PX, LABEL_H_PX), (255, 255, 255))
        offset_x = (LABEL_W_PX - new_w) // 2
        offset_y = (LABEL_H_PX - new_h) // 2
        canvas.paste(image, (offset_x, offset_y))

        # Send to printer via Windows GDI
        _print_image_windows(canvas)

        print(f"✅ Ticket printed successfully on {PRINTER_NAME}")
        return jsonify({'success': True, 'message': 'Ticket printed!'})

    except Exception as e:
        print(f"❌ Print error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500


def _print_image_windows(image):
    """Send a PIL Image to the Windows printer using GDI."""
    printer_name = PRINTER_NAME

    # Open printer
    hprinter = win32print.OpenPrinter(printer_name)
    try:
        printer_info = win32print.GetPrinter(hprinter, 2)
        pdevmode = printer_info['pDevMode']
    finally:
        win32print.ClosePrinter(hprinter)

    # Create device context for the printer
    hdc = win32ui.CreateDC()
    hdc.CreatePrinterDC(printer_name)

    # Get printable area dimensions in device units
    printer_w = hdc.GetDeviceCaps(win32con.HORZRES)
    printer_h = hdc.GetDeviceCaps(win32con.VERTRES)

    # Resize image to fit printer resolution
    image = image.resize((printer_w, printer_h), Image.LANCZOS)

    # Start print job
    hdc.StartDoc('AIRCADE Ticket')
    hdc.StartPage()

    # Draw image on printer DC
    dib = ImageWin.Dib(image)
    dib.draw(hdc.GetHandleOutput(), (0, 0, printer_w, printer_h))

    hdc.EndPage()
    hdc.EndDoc()
    hdc.DeleteDC()


@app.route('/test', methods=['GET'])
def test_print():
    """
    Print a simple test label to verify the printer connection.
    Visit http://localhost:5000/test in the browser to trigger.
    """
    try:
        # Create a simple white test image with text
        from PIL import ImageDraw, ImageFont
        img = Image.new('RGB', (LABEL_W_PX, LABEL_H_PX), (255, 255, 255))
        draw = ImageDraw.Draw(img)
        draw.rectangle([20, 20, LABEL_W_PX - 20, LABEL_H_PX - 20], outline=(0, 0, 0), width=3)
        draw.text((LABEL_W_PX // 2, LABEL_H_PX // 2), "(Ai)rcade\nPRINT TEST", 
                  fill=(0, 0, 0), anchor='mm')
        _print_image_windows(img)
        return jsonify({'success': True, 'message': 'Test label printed!'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


if __name__ == '__main__':
    print("=" * 50)
    print("  (Ai)rcade Print Server")
    print(f"  Printer: {PRINTER_NAME}")
    print(f"  Label size: {LABEL_W_INCHES}\" x {LABEL_H_INCHES}\" @ {DPI} DPI")
    print("  Running on: http://localhost:5000")
    print("  Test print: http://localhost:5000/test")
    print("=" * 50)

    # Verify printer exists before starting
    available_printers = [p[2] for p in win32print.EnumPrinters(
        win32print.PRINTER_ENUM_LOCAL | win32print.PRINTER_ENUM_CONNECTIONS
    )]
    if PRINTER_NAME not in available_printers:
        print(f"\n⚠️  WARNING: Printer '{PRINTER_NAME}' not found!")
        print("Available printers:")
        for p in available_printers:
            print(f"  - {p}")
        print("\nUpdate PRINTER_NAME in this script to match exactly.")
    else:
        print(f"\n✅ Printer found: {PRINTER_NAME}")

    app.run(host='localhost', port=5000, debug=False)
