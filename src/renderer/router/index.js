import Vue from 'vue';
import Router from 'vue-router';

import Content from '../pages/Content.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Content,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
