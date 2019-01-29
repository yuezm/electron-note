<template>
  <div class="move-container" v-if="moveShow">
    <div>
      <Icon type="md-arrow-round-up" title="回到顶部" @click="scroll('top')" />
    </div>
    <div>
      <Icon type="md-arrow-round-down" title="滑到底部" @click="scroll('bottom')" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Move',
  data() {
    return {
      moveShow: false,
    };
  },
  methods: {
    scroll(type) {
      const oTop = type === 'top' ? 0 : document.documentElement.scrollHeight;
      document.documentElement.scrollTop = oTop;
    },
  },
  mounted() {
    document.addEventListener('scroll', () => {
      this.moveShow = document.documentElement.scrollTop >= 50;
    });
  },
};
</script>

<style scoped>
.move-container {
  position: fixed;
  z-index: 99;
  right: 0;
  top: 50%;
  margin-top: -100px;
  font-size: 80px;
  color: #ccc;
}
</style>
