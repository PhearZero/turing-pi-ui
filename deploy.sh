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
tar cf build.tar ./build/

echo

# Deploy and extract
echo "Deploying bundle to $1"
scp build.tar "$1:/mnt/var" &> deploy.remote.log

echo

echo "Extracting bundle on $1"
ssh "$1" "rm -rf /mnt/var/www && tar xvf /mnt/var/build.tar -C /mnt/var && mv /mnt/var/build /mnt/var/www && rm /mnt/var/build.tar" &>> deploy.remote.log

echo

echo "Cleaning up..."
rm ./build.tar
mv .env .env-production
[ -f ".env-disabled" ] && mv .env-disabled .env
