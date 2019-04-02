<template>
  <div class="content-container">
    <div class="top-title">
      <h1 :id="title">{{title}}</h1>
      <div>
        <Button class="content-edit-button" type="primary" icon="ios-create" @click="turnToEdit">编辑</Button>
      </div>
    </div>

    <NavTree :navTree="navTree" />

    <div v-html="html" class="content"></div>
  </div>
</template>

<script>
const path = require('path');
const fs = require('fs');
import { mapGetters } from 'vuex';

import { markIt, computeHash } from '../../utils/util';
import NavTree from './content/NavTree.vue';

export default {
  name: 'electron-note-content',
  components: {
    NavTree,
  },
  computed: {
    ...mapGetters({
      title: 'GET_TITLE',
      baseDir: 'GET_BASE_DIR',
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
      navTree: [],
      contentHash: '', // 记录字符串hash值
    };
  },
  methods: {
    getFileAndHandle(filename) {
      const p = path.join(this.baseDir, filename) + '.md';
      fs.readFile(p, (error, data) => {
        if (!error) {
          const readString = data.toString();
          // 防止无效计算和渲染
          const readHash = computeHash(readString);
          if (readHash === this.contentHash) {
            return;
          }
          this.contentHash = readHash;

          const { html, tree } = markIt(readString);

          this.html = html;
          this.navTree = tree;
        }
      });
    },
    turnToEdit() {
      this.$router.push({
        path: `/edit/${btoa(this.title)}`,
      });
    },
  },
  created() {
    this.$root.$on('WINDOW_FOCUS', () => {
      this.getFileAndHandle(this.title);
    });
  },
};
</script>

<style lang="less">
@import "../../assets/style/global.less";

.content-container {
  margin-top: 70px;
  padding: 0 10px 0 350px;
  height: calc(100vh - 70px);
  overflow-y: auto;
}

.nav-tree {
  position: fixed;
  z-index: 1;
  top: 70px;
  left: 10px;
  bottom: 10px;
  width: 260px;
  padding: 10px 8px;
  border-radius: 5px;
  background-color: #f5f5f5;
  border: 1px solid #e3e3e3;
  overflow-y: auto;

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
  font-family: "ubuntu Mono";
  // font-family: 'Courier New', Courier, monospace
  h1 {
    margin-bottom: 15px;
    font-size: 40px;
  }
  h2 {
    margin-bottom: 10px;
    font-size: 32px;
    font-weight: normal;
    color: @CONTENT_TREE_H2;
  }

  h3 {
    padding: 5px 0;
    margin-bottom: 5px;
    font-size: 18px;
    color: @CONTENT_TREE_H3;
  }
  p {
    line-height: 20px;
    margin-bottom: 5px;
    font-size: 14px;
  }
  ul,
  ol {
    padding: 10px 10px 10px 25px;
    background: #f8f8f8;
    border: solid 1px #e1e4e5;
    border-radius: 4px;
    li {
      margin-bottom: 5px;
      font-size: 14px;
    }
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
}

.top-title {
  height: 80px;
  line-height: 60px;
  h1 {
    float: left;
  }
  & > div {
    float: right;
  }
}

.content-edit-button {
  font-size: 14px;
  background-color: @CONTENT_TREE_H3;
}
</style>
