const electron = require('electron');
const ipcMain = electron.ipcMain;
const path = require('path');
const url = require('url');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const gm = require('gm').subClass({ imageMagick: true });
const log = require('electron-log');
// process.env.ELECTRON_START_URL = `http://localhost:3000`;

const startUrl =
  process.env.ELECTRON_START_URL ||
  url.format({
    pathname: path.join(__dirname, '/../../build/index.html'),
    protocol: 'file:',
    slashes: true,
  });

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      // preload: __dirname + '/preload.js',
    },
    icon: '../assets/favicon-32x32.png',
  });
  mainWindow.loadURL(startUrl);
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}
app.on('ready', createWindow);
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle('r2m', async (event, someArgument) => {
  mainWindow.webContents.openDevTools();
  process.stdout.write('your output to command prompt console or node js ');
  // gm('./src/photo1.jpeg').identify(function (err, data) {
  //   if (!err) mainWindow.webContents.send('ping', JSON.stringify(data));
  //   else mainWindow.webContents.send('ping', err);
  // });
  gm('./src/photo1.jpeg').write('./src/photo.avif', function (err) {
    if (!err) console.log('done');
  });
});
