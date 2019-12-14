#!/bin/bash
dirName=sheep-yawn
pkgName=woolhemina
webName=Woolhemina_s_Bedtime_Round-Up

# Rename the app
mv "packaged/${dirName}/osx64/${dirName}.app" "packaged/${dirName}/osx64/${pkgName}.app"

# Since create-dmg does not override, be sure to delete previous DMG
rm -f "packaged/${webName}-macOS.dmg"

# Create the DMG
create-dmg \
  --volname "${pkgName}" \
  --volicon "assets/images/icon.icns" \
  --background "../background.png" \
  --window-pos 200 120 \
  --window-size 800 400 \
  --icon-size 100 \
  --icon "${pkgName}.app" 170 190 \
  --hide-extension "${pkgName}.app" \
  --app-drop-link 633 185 \
  "packaged/${webName}-macOS.dmg" \
  "packaged/${dirName}/osx64/${pkgName}.app"
