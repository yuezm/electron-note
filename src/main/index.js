import { app, BrowserWindow, Tray, Menu } from 'electron';

const path = require('path');
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\');
} else {
  global.__static = path.join(__dirname, '../../static');
}

let mainWindow;
const winURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080'
    : `file://${__dirname}/index.html`;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 830,
    useContentSize: true,
    width: 1500,
    frame: true,
    icon: path.join(global.__static, 'icons/logo.png'),
  });

  mainWindow.loadURL(winURL);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// 设置托盘样式及托盘菜单
function createTray() {
  console.log(path.join(global.__static, 'icons/logo.png'));
  const tray = new Tray(path.join(global.__static, 'icons/logo.png'));
  tray.setToolTip('Note');
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: 'Show',
        type: 'normal',
        click() {
          app.focus();
        },
      },
      {
        label: 'Exit',
        type: 'normal',
        click() {
          app.quit();
        },
      },
    ])
  );
}

function initApp() {
  createTray();
  createWindow();
}

app.on('ready', initApp);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// 读取指定目录的所有md文件

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
