<template>
  <div class="search" v-show="searchShow">
    <input class="ivu-input" ref="searchInput" placeholder="输入搜索值" v-model="search" @keyup.enter="action" v-focus/>
    <Icon class="search-icon" type="ios-close" @click="close"/>
  </div>
</template>

<script>

import { remote, ipcRenderer } from 'electron';

const webc = remote.getCurrentWebContents();

export default {
  name: 'search',
  data() {
    return {
      search: '',
      searchShow: false,
    };
  },
  watch: {
    searchShow(v) {
      if (v) {
        this.$refs.searchInput.focus();
      }
    },
  },
  directives: {
    focus: {
      // 指令的定义
      inserted(el) {
        el.focus();
      },
      update(el) {
        el.focus();
      },
    },
  },
  methods: {
    action() {
      webc.findInPage(this.search);
    },
    close() {
      webc.stopFindInPage('clearSelection');
      this.searchShow = false;
    },
  },
  mounted() {
    ipcRenderer.on('SEARCH', () => {
      this.searchShow = !this.searchShow;
    });

    ipcRenderer.on('SEARCH_NEXT', () => {
      this.action();
    });
  },
};
</script>

<style scoped lang="less">
  .search {
    display: flex;
    position: fixed;
    right: 120px;
    top: 80px;
    z-index: 99999;
    padding: 6px 12px;
    border: 1px solid #dcdee2;
    border-radius: 4px;

    input {
      width: 200px;
    }

  }

  .search-icon {
    margin-left: 4px;
    font-size: 18px;
    line-height: 32px;
  }
</style>