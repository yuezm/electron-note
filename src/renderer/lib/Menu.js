import { remote } from 'electron';

const { Menu, MenuItem } = remote;

const INIT = Symbol('INIT');

class ContextMenu {
  constructor(router, store) {
    this.router = router;
    this.store = store;
    return this[ INIT ]();
  }

  [ INIT ]() {
    const menu = new Menu();
    const _this = this;

    menu.append(
      new MenuItem({
        label: '  编辑          ',
        click() {
          _this.router.push(`/edit/${btoa(_this.store.getters.GET_TITLE)}`);
        },
      })
    );
    return menu;
  }
}

export default ContextMenu;
