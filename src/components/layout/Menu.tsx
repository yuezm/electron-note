import Vue from 'vue';
import Component from 'vue-class-component';
import { Menu, Icon } from 'ant-design-vue';

import { readdirSync } from 'fs';
import { join } from 'path';

import { isEmpty, removeExt } from '@/helper';
import { IMenuItem } from '@/types';

@Component({
  components: {
    'a-menu': Menu,
    'a-menu-item': Menu.Item,
    'a-icon': Icon,
  },
})

export default class MenuLayout extends Vue {
  private noteList: IMenuItem[] = [];
  private selectedKeys: string[] = [];

  async created(): Promise<void> {
    await this.handleGetMenuList();
    this.handleInitMenu();
  }

  handleGetMenuList() {
    const paths: string[] = readdirSync(this.$config.doc);
    this.noteList = paths
      .filter(path => path.includes('.md'))
      .map((path: string) => ({ path: join(this.$config.doc, path), title: removeExt(path) }));
  }

  handleInitMenu() {
    const title = this.$route.params.id;
    let selectMenu!: IMenuItem;

    for (const item of this.noteList) {
      if (item.title === title) {
        selectMenu = item;
        break;
      }
    }

    if (isEmpty(selectMenu)) {
      selectMenu = this.noteList[ 0 ];
    }

    this.handleMenuSelectedCommitState(selectMenu);
  }

  handleMenuItemClick(menuSelectInfo: any): void {
    this.handleMenuSelectedCommitState(this.noteList[ menuSelectInfo.item.index ]);
    this.$router.push({
      path: `/content/${ menuSelectInfo.item.title }`,
    });
  }

  handleMenuSelectedCommitState(selectMenu: IMenuItem) {
    this.selectedKeys = [ selectMenu.path ];
    this.$store.commit('SET_SELECT_MENU', selectMenu);
  }

  render() {
    return (
      <a-menu theme="dark" mode="inline" selectedKeys={ this.selectedKeys } on-select={ this.handleMenuItemClick }>
        {
          this.noteList.map((note: IMenuItem) => (
            <a-menu-item key={ note.path } title={ note.title }>
              <span>{ note.title }</span>
            </a-menu-item>
          ))
        }
      </a-menu>
    );
  }
}
