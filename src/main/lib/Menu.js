import { app, Menu } from 'electron';

const INIT = Symbol('INIT');

class NoteMenu {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;
    this[ INIT ]();
  }

  [ INIT ]() {
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
            {
              label: 'Find', accelerator: 'CmdOrCtrl+F', click() {
                _this.mainWindow.webContents.send('SEARCH');
              },
            },
            {
              label: 'Find Next', accelerator: 'F3', click() {
                _this.mainWindow.webContents.send('SEARCH_NEXT');
              },
            },
          ],
        },
      ])
    );
  }
}

export default NoteMenu;
