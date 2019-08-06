---
path: /github/notube
---
## Client Side: Shaka Player by Google 
Offical build instructions: [[Link]](https://github.com/google/shaka-player/blob/master/docs/tutorials/welcome.md)
```bash
# Install prerequisites 
curl https://raw.githubusercontent.com/google/shaka-player/master/build/install-linux-prereqs.sh | bash
# Get source and compile
git clone https://github.com/google/shaka-player.git
cd shaka-player
python build/all.py
# Test
./build/test.py --browsers Chrome
```
## Server Side
From GPAC documentation [[Link]](https://gpac.wp.imt.fr/2011/02/02/mp4box-fragmentation-segmentation-splitting-and-interleaving/):
```
MP4Box [-frag <fragment length>] -dash <segment length> [-segment-name <prefix>] file.mp4
```
