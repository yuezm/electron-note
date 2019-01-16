<template>
  <div class="menu-container">
    <Menu :active-name="defaultActiveName" theme="light" mode="horizontal" class="menu-list" @on-select="selectMenu">
      <menu-item :name="item.name" v-for="(item, index) in mineNoteList" :key="index">
        <Icon type="logo-markdown" class="slider-icon" />
        {{item.label}}
      </menu-item>
    </Menu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { splitFilename, computeHash } from '../../utils/util';
const fs = require('fs');


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
      navHash: '', // 记录字符串hash值
    };
  },
  methods: {
    initNavList() {
      const targetDir = fs.readdirSync(this.baseDir);

      if (targetDir.length < 1) {
        return;
      }

      const targetHash = computeHash(targetDir.toString());
      if (targetHash === this.navHash) {
        return;
      }
      this.navHash = targetHash;

      this.mineNoteList = targetDir.map(item => {
        const f = splitFilename(item);
        return {
          name: f,
          label: f,
          url: f,
        };
      });
    },

    selectMenu(name) {
      this.$store.commit('SET_TITLE', name);
    },
  },
  created() {
    this.initNavList();

    // 选中第一个文件为默认打开项
    if (this.$store.getters.GET_TITLE === '') {
      const name = this.mineNoteList.length > 0 ? this.mineNoteList[ 0 ].name : '';
      this.defaultActiveName = name;
      this.selectMenu(name);
    } else {
      this.defaultActiveName = this.$store.getters.GET_TITLE;
    }

    this.$root.$on('WINDOW_FOCUS', () => {
      this.initNavList();
    });
  },
};
</script>
<style lang="less">
@import "../../assets/style/global.less";

.menu-container {
  position: fixed;
  top: 0;
  width: 100%;
}

.menu-container .menu-list {
  background: linear-gradient(#54b4eb, #2fa4e7 60%, #1d9ce5);
  &::after {
    content: "";
    display: none;
  }

  li {
    color: @NAV_FONT_COLOR !important;
    border: none !important;

    &:active,
    &.ivu-menu-item-selected,
    &:hover {
      background-color: #4a84c1;
    }
  }
}
.slider-icon {
  font-size: 20px;
}
</style>
