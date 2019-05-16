<template>
  <div id="app">
    <search/>
    <router-view></router-view>
  </div>
</template>

<script>

import Search from './pages/Search';

export default {
  name: 'electron-note-app',
  components: { Search },
  comments: {
    Search,
  },
};
</script>

<style scoped>
</style>
