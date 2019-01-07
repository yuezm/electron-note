<template>
  <div id="app">
    <Slider></Slider>
    <router-view></router-view>
  </div>
</template>

<script>
import Slider from './pages/Slider.vue';

export default {
  name: 'electron-note',
  components: {
    Slider,
  },
};
</script>

<style>
</style>
