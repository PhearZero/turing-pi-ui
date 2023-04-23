#!/bin/bash


if [ $# -eq 0 ]
  then
    echo "Must have a valid ssh <target>."
    echo "./deploy.sh <target>"
    exit 1
fi

# Build application and create tar
mv .env .env-disabled
mv .env-production .env
[ ! -d "./node_modules" ] && npm install > deploy.install.log
npm run build > deploy.build.log
rm ./build/index.html
mv ./build/index.asp.html ./build/index.asp
tar cvf build.tar ./build/

# Deploy and extract
scp build.tar "$1:/mnt/var"
ssh "$1" "rm -rf /mnt/var/www && tar xvf /mnt/var/build.tar -C /mnt/var && mv /mnt/var/build /mnt/var/www && rm /mnt/var/build.tar"

rm ./build.tar
mv .env .env-production
mv .env-disabled .env
