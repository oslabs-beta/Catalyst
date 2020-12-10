import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

// keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is garbage collected

let mainWindow: Electron.BrowserWindow | null;


function createWindow() {
  // create the browser window
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
      // this allows us to access remote in other files of the app
      enableRemoteModule: true
    },
    icon: path.resolve(__dirname, '../assets/catalyst_icons/CatalystDockIconLarge-04.png')
  });

  if (process.platform === 'darwin') {
    app.dock.setIcon(path.resolve(__dirname, '../assets/catalyst_icons/CatalystDockIconLarge-04.png'));
  }
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(`http://localhost:4000`);
  
  } else {
    const urlToLoad = url.format({
      pathname: path.resolve(__dirname, '../dist/renderer/index.html'),
      protocol: 'file:',
      slashes: true
  });
    mainWindow.loadURL(urlToLoad);
  };



  // emitted when the window is closed
  mainWindow.on('closed', () => {
    // derefernece the window object, normally windows are stored in an array if app
    // supports multi windows, this is the time when you should delete the corresponding element
    mainWindow = null;
  });
}

app.on('ready', () => {
  createWindow();
});


app.allowRendererProcessReuse = true;
