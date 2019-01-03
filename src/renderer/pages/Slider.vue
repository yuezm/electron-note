<template>
  <div>
    <Menu theme="light" mode="horizontal" @on-select="selectMenu">
      <menu-item :name="item.name" v-for="(item, index) in mineNoteList" :key="index">
        <Icon type="logo-markdown" class="slider-icon" />
        {{item.label}}
      </menu-item>
    </Menu>
  </div>
</template>
<script>

const fs = require('fs');
import { splitFilename } from '../utils/util';

const targetDir = fs.readdirSync('/home/yzm/yzm/NOTE/docs');
const fileList = targetDir.map(item => {
  const f = splitFilename(item);
  return {
    name: f,
    label: f,
    url: f,
  };
});

export default {
  name: 'Slider',
  data() {
    return {
      mineNoteList: fileList,
    };
  },
  methods: {
    selectMenu(name) {
      this.$store.dispatch('SET_TITLE', name);
      console.log(this.$store.dispatch);
    },
  },
};
</script>
<style scoped lang="less">
.slider-icon {
  font-size: 20px;
}
</style>
