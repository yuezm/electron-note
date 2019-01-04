<template>
  <div>
    <div class="nav-tree"></div>

    <div v-html="html" class="content">
    </div>
  </div>
</template>

<script>
import { markIt } from '../utils/util';
const path = require('path');
const fs = require('fs');

import { mapGetters } from 'vuex';
export default {
  name: 'Content',
  data() {
    return {
      html: '',
      navTree: '',
    };
  },
  computed: {
    ...mapGetters({
      title: 'GET_TITLE',
    }),
  },
  watch: {
    title(t) {
      const p = path.join('/home/yzm/yzm/NOTE/docs', t) + '.md';
      const { html, tree } = markIt(fs.readFileSync(p).toString());
      this.html = html;
      // this.navTree =
      console.log(this.createNavTree(tree));
    },
  },
  methods: {
    createNavTree(treeList) {
      if (!treeList || treeList.length < 1) {
        return '';
      }
      let str = '';
      rootTree.forEach(element => {
        const ele = str += `<li><a href="#${element.href}">${element.content}</a>${this.createNavTree(element.children)}</li>`
      });
      return str;
    },
  },
};
</script>

<style scoped lang="less">
.content {
  margin-left: 300px;
}
</style>
