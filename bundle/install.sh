echo "Installing dependencies!"
echo
OUTPUT=$(node -v)

echo Node version: $OUTPUT
echo 

npm i

rm node_modules/transform-css-to-js/dist/index.js
mv resources/index.js node_modules/transform-css-to-js/dist/index.js

echo finished install of dependencies!
echo 

sudo rm -r /usr/bin/Vide
sudo mv  Vide/ /usr/bin/

echo moving dependencies!
echo

sudo mv  node_modules/ /usr/bin/Vide

echo finishing install!
echo 

sudo mv vide /usr/bin/vide

echo finished install!

