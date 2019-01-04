const state = {
  title: '',
};

const mutations = {
  SET_TITLE(state, title) {
    state.title = title;
  },
};

const getters = {
  GET_TITLE(state) {
    return state.title;
  },
};

const actions = {
  SET_TITLE({ commit }, title) {
    commit('SET_TITLE', title);
  },
};

export default {
  actions,
  getters,
  mutations,
  state,
};
