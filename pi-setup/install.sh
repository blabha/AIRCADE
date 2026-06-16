#!/bin/bash
echo "Installing (Ai)rcade on Raspberry Pi..."

# Copy systemd services
sudo cp aircade-print.service /etc/systemd/system/
sudo cp aircade-web.service /etc/systemd/system/

# Enable and start services
sudo systemctl daemon-reload
sudo systemctl enable aircade-print.service
sudo systemctl enable aircade-web.service
sudo systemctl start aircade-print.service
sudo systemctl start aircade-web.service

# Set up Chromium kiosk autostart
mkdir -p /home/aircade/.config/autostart
cp aircade-kiosk.desktop /home/aircade/.config/autostart/

# Set printer permissions
sudo chmod a+rw /dev/usb/lp0

# Disable screen blanking
xset s off
xset -dpms
xset s nofade

echo "(Ai)rcade installed! Reboot to start."
