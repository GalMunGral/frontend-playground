---
path: cs2110-gba-raiden
---
# GBA Raiden
*Project for CS 2110 - Computer Organization and Programming*.

### How to launch the game
The game only runs on Ubuntu (>=12.04) as the support packages were written for Ubuntu only. 
```bash
# <arch> should be either i386 or amd64
sudo apt install gcc-arm-none-eabi # ARM Compiler
sudo dpkg -i tools/cs2110-tools_1.0-1_<arch>.deb # GBA compiler
sudo dpkg -i tools/cs2110-tools-emulator-1.6.0-<arch>.deb # GBA Emulator
make
make vba # Launch game
```
### How to play
You control a fighter jet that fires automatically. Enemies shoot bullets at a slower rate, but they will follow you so you have to shoot them down before they perform kamikaze. You start with 3 lives. You score one point for every enemy you kill, and lose one life if you are hit by either a bullet or an enemy jet. Game ends when you lose all 3 lives.

Use D-pad (arrow keys) to move your jet. Always press START (Enter key) to advance to the next screen.
