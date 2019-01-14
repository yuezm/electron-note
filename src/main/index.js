import { app, BrowserWindow, Tray, Menu } from 'electron';

const path = require('path');
const fs = require('fs');
const os = require('os');

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
let logoUrl;
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\');
  logoUrl = path.join(global.__static, 'icon.png');
} else {
  logoUrl = path.join(__dirname, '../../static/icon.png');
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;


function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    icon: logoUrl,
  });

  mainWindow.loadURL(winURL);

  createTray(mainWindow);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// 设置托盘样式及托盘菜单
function createTray(win) {
  const tray = new Tray(logoUrl);
  tray.setToolTip('Note');
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: 'Show',
        type: 'normal',
        click() {
          win.show();
          win.focus();
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

// 设置配置文件,及文件存储的目录
function createConfig() {
  const configDirPath = path.join(os.homedir(), 'electron-note');
  if (!fs.existsSync(configDirPath)) {
    fs.mkdirSync(configDirPath);
    fs.mkdirSync(path.join(configDirPath, 'docs'));
  }

  const configPath = path.join(configDirPath, 'config.json');
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(
      configPath,
      `{"baseDir": "${path.join(configDirPath, 'docs')}"}`
    );
  }
}

function initApp() {
  createWindow();
  createConfig();
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
