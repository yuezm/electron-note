<template>
  <div class="menu-container">
    <Menu :active-name="defaultActiveName" theme="light" mode="horizontal" class="menu-list" @on-select="selectMenu">

      <template v-for="(item, index) in mineNoteList">
        <Submenu v-if="item.type==='subMenu'" :name="item.name" :key="index">
          <template slot="title">
            <Icon type="ios-folder" />
            {{item.label}}
          </template>
          <MenuGroup>
            <MenuItem :name="c.name" v-for="c in item.children">{{c.label}}</MenuItem>
          </MenuGroup>
        </Submenu>

        <menu-item v-else :name="item.name" :key="index">
          <Icon type="logo-markdown" class="slider-icon"/>
          {{item.label}}
        </menu-item>
      </template>
    </Menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { readBaseDir } from '../../utils/util';

export default {
  name: 'electron-note-header',
  computed: {
    ...mapGetters({
      baseDir: 'GET_BASE_DIR',
    }),
  },
  data() {
    return {
      mineNoteList: [],
      defaultActiveName: '',
    };
  },
  methods: {
    initNavList() {
      this.mineNoteList = readBaseDir(this.baseDir);
    },
    selectMenu(name) {
      this.$store.commit('SET_TITLE', name);
    },
  },
  created() {
    this.initNavList();

    // 选中第一个文件为默认打开项
    if (this.$store.getters.GET_TITLE === '') {
      const firstMenu = this.mineNoteList[ 0 ];
      let name = '';
      if (firstMenu) {
        if (firstMenu.hasOwnProperty('children') && firstMenu.children.length > 0) {
          name = firstMenu.children[ 0 ].name;
        } else {
          name = firstMenu.name;
        }
      }

      this.defaultActiveName = name;
      this.selectMenu(name);
    } else {
      this.defaultActiveName = this.$store.getters.GET_TITLE;
    }

    // 实时监控
    this.$root.$on('WINDOW_FOCUS', () => {
      this.initNavList();
    });
  },
};
</script>
<style lang="less">
  @import "../../assets/style/global.less";

  .MENU_BG_COLOR {
    background: linear-gradient(#54b4eb, #2fa4e7 60%, #1d9ce5);
  }

  .menu-container {
    position: fixed;
    z-index: 9;
    top: 0;
    width: 100%;
  }

  .menu-container .menu-list {
    .MENU_BG_COLOR();
    &::after {
      content: "";
      display: none;
    }

    li {
      color: @NAV_FONT_COLOR !important;
      border: none !important;

      &:active,
      &.ivu-menu-item-active,
      &:hover {
        background-color: #4a84c1;
      }
    }

    .ivu-select-dropdown {
      .MENU_BG_COLOR();
      .ivu-menu-drop-list {
        .MENU_BG_COLOR();
        :hover {
          .MENU_BG_COLOR();
        }

        li {
          &:active,
          &.ivu-menu-item-active,
          &:hover {
            background: #4a84c1;
          }
        }
      }

      .ivu-menu-item-group-title {
        display: none;
      }
    }
  }

  .slider-icon {
    font-size: 20px;
  }
</style>
