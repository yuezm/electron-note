const state = {
  title: '',
  baseDir: '',
};

const mutations = {
  SET_TITLE(state, title) {
    state.title = title;
  },
  SET_BASE_DIR(state, baseDir) {
    state.baseDir = baseDir;
  },
};

const getters = {
  GET_TITLE(state) {
    return state.title;
  },
  GET_BASE_DIR(state) {
    return state.baseDir;
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
