if [ ! $0 ]; then
  exit
fi
user=`ggrep -Po "(?<=\"user\": \")\w+(?=\")" $1`
host=`ggrep -Po "(?<=\"public_ip\": \").+(?=\")" $1`

ssh $user@$host
