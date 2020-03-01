import Vue from "vue";
import Vuex from "vuex";
import { IVuexState, IMenuItem } from '@/types';

Vue.use(Vuex);

export default new Vuex.Store<IVuexState>({
  state: {
    selectMenu: undefined
  },
  getters: {
    GET_SELECT_MENU(state: IVuexState) {
      return state.selectMenu;
    }
  },
  mutations: {
    SET_SELECT_MENU(state: IVuexState, data: IMenuItem) {
      state.selectMenu = data;
    }
  },
  actions: {}
});
