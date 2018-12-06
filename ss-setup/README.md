```bash
# To download & install
curl -sLo setup.tar https://github.com/GalMunGral/school-stuff/raw/master/setup.tar.gz
tar -xzf setup.tar
cd ss-setup
. setup.sh --server # Server
. setup.sh [vps_config] [--http] # Client
path/to/chrome --proxy-server="socks5://127.0.0.1:1080" # Proxy Chrome traffic
```
