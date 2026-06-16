# (Ai)rcade — Raspberry Pi Setup

## Prerequisites
- Raspberry Pi 4 with Raspberry Pi OS (64-bit)
- Printer added to CUPS as "aircade-printer"
- Python3 with flask, flask-cors, pillow installed

## Install
```bash
cd ~/AIRCADE/pi-setup
chmod +x install.sh
./install.sh
sudo reboot
```

## After reboot
The game will start automatically in fullscreen.
The print server runs in the background.

## Manual commands
```bash
sudo systemctl status aircade-print
sudo systemctl status aircade-web
sudo systemctl restart aircade-print
```
