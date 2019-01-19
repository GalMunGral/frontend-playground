sudo apt-get update
sudo apt-get install -y curl
sudo apt-get install -y git

# Install node
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash - && wait
sudo apt-get install -y nodejs

# Add repo and key and install vscode
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'
sudo apt-get install apt-transport-https # Required to install vscode
sudo apt-get update
sudo apt-get install -y code-insiders
