<template>
  <div id="app">
    <Slider></Slider>
    <Content></Content> 
  </div>
</template>

<script>
import Slider from './pages/Slider.vue';
import Content from './pages/Content.vue';

export default {
  name: 'electron-note',
  components: {
    Slider,
    Content,
  },
};
</script>

<style>
</style>
