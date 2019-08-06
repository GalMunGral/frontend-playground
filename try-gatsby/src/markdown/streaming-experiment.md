---
path: /github/streaming-experiment
---
## Client Side: Shaka Player (by Google )
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
### Attempt 1: Generate HLS stream using FFmpeg
```bash
ffmpeg -i ../test.mp4 -c:a aac -strict experimental -c:v libx264 -s <size> -aspect 16:9 -f hls -hls_list_size 1000000 -hls_time 2 index.m3u8
```
**Issue:** Chrome doesn't seem to support MPEG-2 TS files used by HLS.
### Attempt 2: Generate DASH stream using X264 and MP4BOX
Following [this tutorial](https://bitmovin.com/mp4box-dash-content-generation-x264/):
```bash
# Install tools
sudo apt install x264
sudo apt install gpac
# (Re)encode
x264 --output intermediate.264 --fps 24 --preset slow --bitrate 2400 --vbv-maxrate 4800 --vbv-bufsize 9600 --min-keyint 48 --keyint 48 --scenecut 0 --no-scenecut --pass 1 test.mp4
# Add MP4 container
MP4Box -add intermediate.264 -fps 24
# Segmentation
MP4Box -dash 4000 -frag 4000 -rap -segment-name segment_ -out manifest.mpd ../out.mp4
MP4Box -dash 4000 -frag 4000 -rap -segment-name audio_segment_ -out audio.mpd ../out.mp4#audio
```
**Issue:** Video and audio out of sync after reencoding.
### Attempt 3: Use FFmpeg to (re)encode and MP4BOX to segment
```bash
sudo apt install gpac # Required for MP4BOX
ffmpeg -i test.mp4 -vcodec libx264 -acodec aac -r 24 -x264-params keyint=48:scenecut=0 out.mp4
cd dash & MP4Box -dash 4000 -frag 4000 -rap -segment-name segment_ -out manifest.mpd ../out.mp4
```
