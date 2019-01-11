import Vue from 'vue';
import iView from 'iview';
import { remote } from 'electron';
import './assets/style/main.less';
import 'iview/dist/styles/iview.css';

import App from './App';
import store from './store';

const path = require('path');
const fs = require('fs');
const os = require('os');

Vue.use(iView);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

function readConfig() {
  const { baseDir } = JSON.parse(
    fs.readFileSync(path.join(os.homedir(), 'electron-note/config.json'))
  );
  store.commit('SET_BASE_DIR', baseDir);
}
readConfig();
/* eslint-disable no-new */
const vm = new Vue({
  components: { App },
  store,
  template: '<App/>',
}).$mount('#app');

// --------------- 事件监听 ---------------
remote.getCurrentWindow().on('focus', () => {
  vm.$emit('WINDOW_FOCUS');
});
