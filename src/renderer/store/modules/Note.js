const state = {
  title: '',
};

const mutations = {
  GET_TITLE(state) {
    return state.title;
  },
  SET_TITLE(state, title) {
    state.title = title;
  },
};

export default {
  state,
  mutations,
};
