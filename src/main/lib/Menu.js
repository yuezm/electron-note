import { app, Menu } from 'electron';

const INIT = Symbol('INIT');
class NoteMenu {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;
    this[INIT]();
  }

  [INIT]() {
    const _this = this;
    Menu.setApplicationMenu(
      Menu.buildFromTemplate([
        {
          label: '文件',
          submenu: [
            {
              label: '新建文件',
              click() {
                _this.mainWindow.webContents.send('ADD_FILE');
              },
            },
            {
              label: '退出',
              click() {
                app.quit();
              },
            },
            { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
            { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
          ],
        },
      ])
    );
  }
}
export default NoteMenu;
