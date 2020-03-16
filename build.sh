#!/bin/sh

echo 'node \c'
node -v
echo 'npm \c'
npm -v

npm install
npm run build

if [ $? -ne 0 ]; then
exit 1
fi

mkdir -p ./output/webapps/auto-bi
cp -r ./build/* ./output/webapps/auto-bi
echo 'Build complete.'
