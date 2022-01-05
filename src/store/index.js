import {createStore} from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import tabs from '../tabs.js';

const store = createStore({
  state: {
    tabs,
  },
  getters: {
    _getTabs(state) {
      return state.tabs;
    },
  },
  mutations: {
    updateList(state, payload) {
      state.tabs = payload;
    },
    updateItems(state) {
      state.tabs = state.tabs;
    },
  },
  plugins: [createPersistedState()],
});

export default store;
