<template>
  <div>
    <Menu theme="light">
      <Submenu name="MINE">
        <template slot="title">
          <Icon type="ios-paper" />
          我的笔记
        </template>
        <menu-item :name="item.name" v-for="(item, index) in mineNoteList" :key="index">{{item.name}}</menu-item>
      </Submenu>

      <menu-item name="TRASH">
        <Icon type="ios-paper" />
        回收站
      </menu-item>
    </Menu>
  </div>
</template>
<script>
export default {
  name: 'Slider',
  data() {
    return {
      mineNoteList: [
        {
          name: '第一步',
          url: '',
        },
      ],
    };
  },
};
</script>
<style scoped lang="less">
</style>