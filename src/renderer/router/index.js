import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: require('@/pages/List').default,
    },
    {
      path: '/edit',
      name: 'Edit',
      component: require('@/pages/Edit').default,
    },
  ],
});
