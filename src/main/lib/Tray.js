import { app, Tray, Menu } from 'electron';

const INIT = Symbol('INIT');

class NoteTray {
  constructor(mainWindow, iconPath) {
    this.mainWindow = mainWindow;
    this.iconPath = iconPath;

    this[INIT]();
  }

  [INIT]() {
    const tray = new Tray(this.iconPath);
    tray.setContextMenu(
      Menu.buildFromTemplate([
        {
          label: 'Show',
          type: 'normal',
          click() {
            this.mainWindow.show();
            this.mainWindow.focus();
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
}

export default NoteTray;
