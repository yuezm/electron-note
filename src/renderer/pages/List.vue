<template>
  <div>
    <Header></Header>
    <Content></Content>
  </div>
</template>

<script>
import Header from './list/Header.vue';
import Content from './list/Content.vue';

export default {
  name: 'List',
  components: {
    Header,
    Content,
  },
};
</script>

<style scoped>

</style>
