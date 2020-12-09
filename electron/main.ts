import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS} from 'electron-devtools-installer';


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
  // calling installExtension func after the ready event was emitted by app
  // on the different extensions by looping through array of them
  [REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS].forEach(extension => {
    installExtension(extension)
    .then((name) => console.log(`Added Extension: ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
  });
  // once extensions are looped through, invoking createWindow method
  
  createWindow();
});


app.allowRendererProcessReuse = true;
