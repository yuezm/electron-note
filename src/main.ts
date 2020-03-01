import Vue from 'vue';

import { getNoteConfig } from './boot';
import App from './App';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/antd.min.css';
import '@/assets/style/style.less';

Vue.config.productionTip = false;
Vue.prototype.$config = getNoteConfig();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
