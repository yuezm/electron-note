<template>
  <div>
    <Header></Header>
    <Content></Content>
    <Move></Move>
  </div>
</template>

<script>
import Header from './list/Header.vue';
import Content from './list/Content.vue';
import Move from './list/Move.vue';

export default {
  name: 'List',
  components: {
    Header,
    Content,
    Move,
  },
};
</script>

<style scoped>

</style>
