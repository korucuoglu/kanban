import {createStore} from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import tabs from '../tabs.js';

const store = createStore({
  state: {
    tabs,
    currentTask: null,
  },
  getters: {
    _getTabs(state) {
      return state.tabs;
    },
    _getCurrentTask(state) {
      return state.currentTask;
    },
  },
  mutations: {
    updateList(state, payload) {
      state.tabs = payload;
    },
    updateItems(state) {
      state.tabs = state.tabs;
    },
    addTask(state, payload) {
      // const element = state.tabs.filter((tab) => {
      //   return Object.keys(tab).some((element) => {
      //     return tab[element] == 'Backlog';
      //     // Ilk tab her zaman Backlog olacaksa burasi kullanilabilir ancak tablarin da yeri degisebilecegi icin her zaman ilk siraya eklenmeli.
      //   });
      // });

      state.tabs[0].items.push(payload);
    },
    setCurrentTask(state, payload) {
      state.currentTask = payload;
    },
    updateTask(state, payload) {
      // console.log(state.tabs.filter((tab) => tab.id == payload[1])[0].items.filter((item) => item.id == payload[0].id)[0]);
      // console.log(payload[0]);
      // TODO: Su anda guncellenmiyor. payload[0]'a esitlenmeli
    },
  },
  plugins: [createPersistedState()],
});

export default store;
