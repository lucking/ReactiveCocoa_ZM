#! /bin/sh
# update cordova plugins

rm -rf org.apache.cordova.*

git clone https://git-wip-us.apache.org/repos/asf/cordova-plugin-splashscreen.git org.apache.cordova.splashscreen
git clone https://git-wip-us.apache.org/repos/asf/cordova-plugin-network-information.git org.apache.cordova.network-information
git clone https://git-wip-us.apache.org/repos/asf/cordova-plugin-file.git org.apache.cordova.file
git clone https://git-wip-us.apache.org/repos/asf/cordova-plugin-file-transfer.git org.apache.cordova.file-transfer
git clone https://git-wip-us.apache.org/repos/asf/cordova-plugin-media.git org.apache.cordova.media
git clone https://git-wip-us.apache.org/repos/asf/cordova-plugin-vibration.git org.apache.cordova.vibration
git clone https://git-wip-us.apache.org/repos/asf/cordova-plugin-media-capture.git org.apache.cordova.media-capture
git clone https://git-wip-us.apache.org/repos/asf/cordova-plugin-inappbrowser.git org.apache.cordova.inappbrowser
git clone https://git-wip-us.apache.org/repos/asf/cordova-plugin-globalization.git org.apache.cordova.globalization
git clone https://git-wip-us.apache.org/repos/asf/cordova-plugin-geolocation.git org.apache.cordova.geolocation
git clone https://git-wip-us.apache.org/repos/asf/cordova-plugin-dialogs.git org.apache.cordova.dialogs
git clone https://git-wip-us.apache.org/repos/asf/cordova-plugin-device-orientation.git org.apache.cordova.device-orientation
git clone https://git-wip-us.apache.org/repos/asf/cordova-plugin-device.git org.apache.cordova.device
git clone https://git-wip-us.apache.org/repos/asf/cordova-plugin-contacts.git org.apache.cordova.contacts
git clone https://git-wip-us.apache.org/repos/asf/cordova-plugin-console.git org.apache.cordova.console
git clone https://git-wip-us.apache.org/repos/asf/cordova-plugin-camera.git org.apache.cordova.camera
git clone https://git-wip-us.apache.org/repos/asf/cordova-plugin-device-motion.git org.apache.cordova.device-motion
git clone https://git-wip-us.apache.org/repos/asf/cordova-plugin-battery-status.git org.apache.cordova.battery-status
git clone https://git-wip-us.apache.org/repos/asf/cordova-plugin-statusbar.git org.apache.cordova.statusbar
