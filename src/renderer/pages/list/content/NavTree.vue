<template>
  <div class="nav-tree" v-html="navTreeHtml"></div>
</template>
<script>
export default {
  name: 'electron-note-nav-tree',
  props: {
    navTree: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
  },
  computed: {
    navTreeHtml() {
      return this.createNavTree(this.navTree);
    },
  },
  methods: {
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
};
</script>
<style scoped lang="less">
</style> 