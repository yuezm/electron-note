import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import List from '../pages/List.vue';
import Edit from '../pages/Edit.vue';

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List,
    },
    {
      path: '/edit/:title',
      name: 'Edit',
      component: Edit,
    },
  ],
});
