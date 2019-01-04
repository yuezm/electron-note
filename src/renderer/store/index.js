import Vue from 'vue';
import Vuex from 'vuex';

// import { createPersistedState, createSharedMutations } from 'vuex-electron';
import Note from './modules/Note';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Note,
  },
  // plugins: [
  //   createPersistedState(),
  //   createSharedMutations(),
  // ],
  strict: process.env.NODE_ENV !== 'production',
});
