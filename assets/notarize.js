require('dotenv').config();
const { notarize } = require('electron-notarize');

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;  
  if (electronPlatformName !== 'darwin') {
    return;
  }

  const appName = context.packager.appInfo.productFilename;
  console.log('APPNAME', appName);
  console.log('APPOUTDIR:', appOutDir);
  try{
    await notarize({
      appBundleId: 'com.example.catalyst',
      appPath: `${appOutDir}/${appName}.app`,
      appleId: process.env.APPLEID,
      appleIdPassword: process.env.APPLEIDPASS,
    });
  }
    catch (err) {
      console.log(err);
    } 

  // console.log('done notarizing', appBundleId);
};