<template>
  <div class="content-container">
    <div class="nav-tree" v-html="navTree"></div>

    <div v-html="html" class="content">
    </div>
  </div>
</template>

<script>
import { markIt, computeHash } from '../utils/util';

const path = require('path');
const fs = require('fs');
const { remote } = require('electron');
import { mapGetters } from 'vuex';

export default {
  name: 'Content',
  computed: {
    ...mapGetters({
      title: 'GET_TITLE',
    }),
  },
  watch: {
    title: {
      handler(t) {
        this.getFileAndHandle(t);
      },
      immediate: true,
    },
  },
  data() {
    return {
      html: '',
      navTree: '',
      contentHash: '', // 记录字符串hash值
    };
  },
  methods: {
    getFileAndHandle(filename) {
      const p = path.join('/home/yzm/yzm/NOTE/docs', filename) + '.md';
      fs.readFile(p, (error, data) => {
        if (!error) {
          const readString = data.toString();
          const readHash = computeHash(readString);
          if (readHash === this.contentHash) {
            return;
          }
          this.contentHash = readHash;
          const { html, tree } = markIt(readString);
          this.html = html;
          this.navTree = this.createNavTree(tree);
        }
      });
    },

    createNavTree(treeList) {
      if (!treeList || treeList.length < 1) {
        return '';
      }
      let str = '<ul>';
      treeList.forEach(element => {
        str += `<li><a href="#${element.href}">${element.content}</a>${this.createNavTree(element.children)}</li>`;
      });
      return str + '</ul>';
    },
  },
  mounted() {
    remote.getCurrentWindow().on('focus', () => {
      this.getFileAndHandle(this.title);
    });
  },
};
</script>

<style lang="less">
@import "../assets/style/global.less";

.content-container {
  padding: 0 10px;
}

.content {
  margin-left: 300px;
}

.nav-tree {
  width: 260px;
  float: left;
  padding: 10px 8px;
  height: 100%;
  border-radius: 5px;
  background-color: #f5f5f5;
  border: 1px solid #e3e3e3;

  li {
    margin-bottom: 4px;
    list-style: none;
  }

  & > ul > li {
    font-size: 22px;
    font-weight: bold;
    a {
      color: @CONTENT_TREE_H1;
    }
    & > ul > li {
      padding-left: 8px;
      font-size: 18px;
      font-weight: normal;
      a {
        color: @CONTENT_TREE_H2;
      }
      & > ul > li {
        padding-left: 8px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: normal;
        font-size: 14px;
        a {
          color: @CONTENT_TREE_H3;
        }
      }
    }
  }
}

.content {
  color: @MAIN_FONT_COLOR;
  h1 {
    font-size: 40px;
  }
  h2 {
    font-size: 32px;
    font-weight: normal;
    color: @CONTENT_TREE_H2;
  }

  h3 {
    font-size: 18px;
    padding: 5px 0;
    color: @CONTENT_TREE_H3;
  }
  p {
    line-height: 20px;
    font-size: 14px;
  }

  li {
    margin-bottom: 5px;
  }
  pre {
    padding: 10px;
    background: #f8f8f8;
    border: solid 1px #e1e4e5;
    border-radius: 4px;
    overflow-x: auto;
    font-size: 14px;
    code {
      font-family: Ubuntu Mono, monospace, serif;
      color: @MAIN_CODE_COLOR;
      vertical-align: middle;
    }
  }

  h3 {
  }
}
</style>
