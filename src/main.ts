import Vue from 'vue';

import { getNoteConfig } from './boot';
import App from './App';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/antd.min.css';
import '@/assets/style/style.less';

import 'prismjs/themes/prism.css';
import open from 'open';

Vue.config.productionTip = false;
Vue.prototype.$config = getNoteConfig();

document.addEventListener('click', async (ev: MouseEvent) => {
  const targetElement = ev.target as Element;

  // 不使用内置浏览器打开链接，使用系统默认浏览器打开
  if (targetElement.nodeName === 'A') {
    ev.preventDefault();
    await open((targetElement as HTMLAnchorElement).href, { wait: true });
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');


