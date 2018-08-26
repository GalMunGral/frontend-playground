if which apt-get; then
  sudo apt update
  sudo apt install python-pip
fi
sudo pip install --upgrade pip
pip install git+https://github.com/shadowsocks/shadowsocks.git@master
ssserver --version
sslocal --version

if [[ "$*" =~ "--server" ]]; then
  sudo ssserver -c ./ss-config.json -d restart --log-file ./log
  pgrep ssserver
else
  match="\"server\": \".*\""
  if which ggrep; then
    remote_ip=`ggrep -Po "(?<=\"public_ip\": \").+(?=\")" $1`
     replacement="\"server\": \"$remote_ip\""
     sed -i .bak "s/$match/$replacement/" ./ss-config.json
  else
    remote_ip=`grep -Po "(?<=\"public_ip\": \").+(?=\")" $1`
     replacement="\"server\": \"$remote_ip\""
     sed -i "s/$match/$replacement/" ./ss-config.json
  fi
  echo "CONNECTING TO $remote_ip"

  sudo sslocal -c ./ss-config.json -d restart --log-file ./log
  
  if [[ "$*" =~ "--http" ]]; then
    if which apt-get; then
      sudo apt install polipo
    else
      brew install polipo
    fi
    sudo pkill polipo
    polipo -c ./polipo.conf &
    export http_proxy=http://localhost:8123
  fi
fi
