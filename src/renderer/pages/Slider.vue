<template>
  <div class="menu-container">
    <Menu :active-name="defaultActiveName" theme="light" mode="horizontal" class="menu-list" @on-select="selectMenu">
      <menu-item :name="item.name" v-for="(item, index) in mineNoteList" :key="index">
        <Icon type="logo-markdown" class="slider-icon"/>
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
      defaultActiveName: '',
    };
  },
  methods: {
    selectMenu(name) {
      this.$store.commit('SET_TITLE', name);
    },
  },
  created() {
    const name = this.mineNoteList[0].name;
    this.defaultActiveName = name;
    this.selectMenu(name);
  },
};
</script>
<style scoped lang="less">
  @import '../assets/style/global.less';
  
  .menu-container .menu-list{
    background: linear-gradient(#54b4eb,#2fa4e7 60%,#1d9ce5);
    border-color: #1995dc;
    border-bottom: 1px solid #178acc;
    &::after{
      content: '';
    }

    li{
      color: @NAV_FONT_COLOR !important;
      border: none !important;
    
      &:active, &.ivu-menu-item-selected, &:hover{
        background-color: #4a84c1;
      }
    }
  }
  .slider-icon {
    font-size: 20px;
  }
</style>
