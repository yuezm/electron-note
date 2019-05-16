import Vue from 'vue';
import iView from 'iview';
import { remote, ipcRenderer } from 'electron';
import 'iview/dist/styles/iview.css';
import 'mavon-editor/dist/css/index.css';
import mavonEditor from 'mavon-editor';

import App from './App';
import store from './store';
import router from './router';
import './assets/style/main.less';
import Menu from './lib/Menu';

const path = require('path');
const fs = require('fs');
const os = require('os');

Vue.use(iView);
Vue.use(mavonEditor);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

function readConfig() {
  const { baseDir } = JSON.parse(fs.readFileSync(path.join(os.homedir(), 'electron-note/config.json'))
    .toString());
  store.commit('SET_BASE_DIR', baseDir);
}

readConfig();
/* eslint-disable no-new */
const vm = new Vue({
  components: { App },
  store,
  router,
  template: '<App/>',
}).$mount('#app');

// --------------- 事件监听 ---------------
const menu = new Menu(router, store);
remote.getCurrentWindow()
  .on('focus', () => {
    vm.$emit('WINDOW_FOCUS');
  });

ipcRenderer.on('ADD_FILE', () => {
  router.push('/edit/add');
});

window.addEventListener('contextmenu', () => {
  if (vm.$route.name === 'List') {
    menu.popup();
  }
});

