#!/bin/bash

# Customize for specific game
dirName=sheep-yawn
pkgName=woolhemina

# Move to dir and rename it
pushd "./packaged/${dirName}/"
mv "./win64/${dirName}.exe" "./win64/${pkgName}.exe"
mv win64 "${pkgName}"

# Delete previous archive
test "../${pkgName}-win64.zip" & rm "../${pkgName}-win64.zip"

# Create archive
zip -r9 "../${pkgName}-win64.zip" "./${pkgName}"

# Name back and move back
mv "${pkgName}" win64
mv "./win64/${pkgName}.exe" "./win64/${dirName}.exe"
popd
