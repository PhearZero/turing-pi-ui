#!/bin/bash

cat << EndOfMessage
 _____ _   _ ____  ___ _   _  ____   ____  ___   ___
|_   _| | | |  _ \|_ _| \ | |/ ___| |  _ \|_ _| |_  \\
  | | | | | | |_) || ||  \| | |  _  | |_) || |    ) |
  | | | |_| |  _ < | || |\  | |_| | |  _ / | |   / /
  |_|  \___/|_| \_|___|_| \_|\____| |_|   |___| |___|


EndOfMessage

if [ $# -eq 0 ]
  then
    echo "Must have a valid ssh <target>."
    echo "./deploy.sh <target>"
    exit 1
fi


# Build application and create tar
echo "Building bundle..."
[ -f ".env" ] && mv .env .env-disabled
cp .env-production .env
[ ! -d "./node_modules" ] && npm install &> deploy.install.log
npm run build &> deploy.build.log
rm ./build/index.html
mv ./build/index.asp.html ./build/index.asp

echo

# Deploy and extract
echo "Upload bundle to $1"
# credit to @srcshelton in Turing Pi Discord, tar to remote folder instead of sending the bundle
tar -cf - ./build | ssh "$1" 'tar -xvf - -C /mnt/var' &> deploy.remote.log

echo

now=$(date +%s)

echo "Backing up service to '/mnt/sdcard/www-$now.tar' and deploying turing-pi-ui"
# credit to @srcshelton in Turing Pi Discord, backup existing www directory to the sdcard
# shellcheck disable=SC2029
ssh "$1" "[ -d /mnt/var/www ] && [ -d /mnt/sdcard ] && tar cf /mnt/sdcard/www-$now.tar -C /mnt/var/ www && rm -rf /mnt/var/www && mv /mnt/var/build /mnt/var/www" &>> deploy.remote.log

echo

echo "Cleaning up..."
[ -f ".env-disabled" ] && mv .env-disabled .env
