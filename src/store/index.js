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
      let tabItem = state.tabs.filter((tab) => tab.id == payload[1])[0].items.filter((item) => item.id == payload[0].id)[0];
      payload = payload[0];

      tabItem.id = payload.id;
      tabItem.title = payload.title;
      tabItem.color = payload.color;
      tabItem.content = payload.content;

      // Burada direkt olarak state.tabs.filter((tab) => tab.id == payload[1])[0].items.filter((item) => item.id == payload[0].id)[0] = payload[0] islemini calistiramadigim icin boyle cozum buldum.
    },

    deleteTask(state, payload) {
      const itemsOfSelectedTab = state.tabs.filter((tab) => tab.id == payload[1])[0].items;
      // Silinmesi icin secilen objenin bulundugu listeyi buluyor.
      // payload[0] elemani bize secilen objeyi direkt olarak veriyor.
      // payload[1] elemani bize tabId verisini veriyor. Bunlari delete tusuna basildigi anda aliyoruz.

      const tabItem = itemsOfSelectedTab.filter((item) => item.id == payload[0].id)[0];
      // Secilen objenin tab icindeki items listesindeki esitlenen objeyi(task'i) buluyor. Bununla tabin icindeki item listesinin icindeki hangi obje ile eslestigini buluyoruz.

      const index = itemsOfSelectedTab.indexOf(tabItem);
      // Objenin itemsOfSelectedTab icindeki sira numarasini buluyor.

      itemsOfSelectedTab.splice(index, 1);
    },
  },
  plugins: [createPersistedState()],
});

export default store;
