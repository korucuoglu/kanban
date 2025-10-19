import {createStore} from 'vuex';
import { tabService, taskService } from '../services/api.js';
import tabs from '../tabs.js';

const store = createStore({
  state: {
    tabs: [],
    currentTask: null,
    loading: false,
    error: null,
  },
  getters: {
    _getTabs(state) {
      return state.tabs;
    },
    _getCurrentTask(state) {
      return state.currentTask;
    },
    _getLoading(state) {
      return state.loading;
    },
    _getError(state) {
      return state.error;
    },
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
    setTabs(state, tabs) {
      state.tabs = tabs;
    },
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
      const [taskData, tabId] = payload;
      
      // Find the tab by _id
      const tab = state.tabs.find(tab => tab._id === tabId);
      if (!tab) return;
      
      // Find the task by _id and update it
      const task = tab.items.find(item => item._id === taskData._id);
      if (task) {
        task.title = taskData.title;
        task.color = taskData.color;
        task.content = taskData.content;
      }
    },

    deleteTask(state, payload) {
      const [taskData, tabId] = payload;
      
      // Find the tab by _id
      const tab = state.tabs.find(tab => tab._id === tabId);
      if (!tab) return;
      
      // Find the task by _id and remove it
      const taskIndex = tab.items.findIndex(item => item._id === taskData._id);
      if (taskIndex !== -1) {
        tab.items.splice(taskIndex, 1);
      }
    },
  },
  actions: {
    // Initialize tabs from MongoDB or fallback to default data
    async initializeTabs({ commit, dispatch }) {
      try {
        commit('setLoading', true);
        commit('setError', null);
        
        const tabs = await tabService.getAllTabs();
        
        if (tabs && tabs.length > 0) {
          commit('setTabs', tabs);
        } else {
          // If no tabs in database, initialize with default data
          await dispatch('initializeDefaultTabs');
        }
      } catch (error) {
        console.error('Error initializing tabs:', error);
        commit('setError', error.message);
        // Fallback to default data
        await dispatch('initializeDefaultTabs');
      } finally {
        commit('setLoading', false);
      }
    },

    // Initialize with default tabs data
    async initializeDefaultTabs({ commit }) {
      try {
        // Create default tabs in MongoDB
        for (const tab of tabs) {
          await tabService.createTab(tab);
        }
        commit('setTabs', tabs);
      } catch (error) {
        console.error('Error initializing default tabs:', error);
        commit('setError', error.message);
        // Use local data as last resort
        commit('setTabs', tabs);
      }
    },

    // Add new task
    async addTask({ commit, state }, taskData) {
      try {
        commit('setLoading', true);
        commit('setError', null);
        
        // Add to first tab (Backlog)
        const firstTab = state.tabs[0];
        if (firstTab) {
          const newTask = await taskService.addTask(firstTab._id, taskData);
          commit('addTask', newTask);
        }
      } catch (error) {
        console.error('Error adding task:', error);
        commit('setError', error.message);
      } finally {
        commit('setLoading', false);
      }
    },

    // Update task
    async updateTask({ commit, state }, payload) {
      try {
        commit('setLoading', true);
        commit('setError', null);
        
        const [taskData, tabId] = payload;
        
        // Get current tab version
        const currentTab = state.tabs.find(tab => tab._id === tabId);
        if (!currentTab) {
          throw new Error('Tab not found');
        }
        
        // Include version in request
        const taskDataWithVersion = { ...taskData, version: currentTab.version };
        const updatedTask = await taskService.updateTask(tabId, taskData._id, taskDataWithVersion);
        
        // Update local state with new version
        commit('updateTask', [updatedTask, tabId]);
      } catch (error) {
        console.error('Error updating task:', error);
        if (error.response?.status === 409) {
          // Version conflict - refresh data
          commit('setError', 'Data was updated by another user. Refreshing...');
          await dispatch('refreshTabs');
        } else {
          commit('setError', error.message);
        }
      } finally {
        commit('setLoading', false);
      }
    },

    // Delete task
    async deleteTask({ commit }, payload) {
      try {
        commit('setLoading', true);
        commit('setError', null);
        
        const [taskData, tabId] = payload;
        await taskService.deleteTask(tabId, taskData._id);
        commit('deleteTask', payload);
      } catch (error) {
        console.error('Error deleting task:', error);
        commit('setError', error.message);
      } finally {
        commit('setLoading', false);
      }
    },

    // Refresh tabs from database
    async refreshTabs({ commit }) {
      try {
        commit('setLoading', true);
        commit('setError', null);
        
        const tabs = await tabService.getAllTabs();
        commit('setTabs', tabs);
      } catch (error) {
        console.error('Error refreshing tabs:', error);
        commit('setError', error.message);
      } finally {
        commit('setLoading', false);
      }
    },

    // Update tabs order after drag and drop
    async updateTabsOrder({ commit }, tabs) {
      try {
        commit('setLoading', true);
        commit('setError', null);
        
        // Update each tab's order in MongoDB
        for (let i = 0; i < tabs.length; i++) {
          const tab = tabs[i];
          if (tab._id) {
            await tabService.updateTab(tab._id, { ...tab, order: i });
          }
        }
        
        commit('setTabs', tabs);
      } catch (error) {
        console.error('Error updating tabs order:', error);
        commit('setError', error.message);
      } finally {
        commit('setLoading', false);
      }
    },

    // Update tab title
    async updateTabTitle({ commit, state }, payload) {
      try {
        commit('setLoading', true);
        commit('setError', null);
        
        const { tabId, title } = payload;
        await tabService.updateTab(tabId, { title });
        
        // Update local state
        const tabs = state.tabs.map(tab => 
          tab._id === tabId ? { ...tab, title } : tab
        );
        commit('setTabs', tabs);
      } catch (error) {
        console.error('Error updating tab title:', error);
        commit('setError', error.message);
      } finally {
        commit('setLoading', false);
      }
    },

    // Update tasks order within a tab
    async updateTasksOrder({ commit, state }, { tabId, tasks }) {
      try {
        commit('setLoading', true);
        commit('setError', null);
        
        // Update the tab with new tasks order
        await tabService.updateTab(tabId, { items: tasks });
        
        // Update local state
        const tabs = state.tabs.map(tab => 
          tab._id === tabId ? { ...tab, items: tasks } : tab
        );
        commit('setTabs', tabs);
      } catch (error) {
        console.error('Error updating tasks order:', error);
        commit('setError', error.message);
      } finally {
        commit('setLoading', false);
      }
    },

    // Move task between tabs
    async moveTaskBetweenTabs({ commit, dispatch }, { fromTabId, toTabId, taskId }) {
      try {
        commit('setLoading', true);
        commit('setError', null);
        
        await taskService.moveTask(fromTabId, toTabId, taskId);
        
        // Refresh tabs to get updated data
        await dispatch('refreshTabs');
      } catch (error) {
        console.error('Error moving task between tabs:', error);
        commit('setError', error.message);
      } finally {
        commit('setLoading', false);
      }
    },
  },
});

export default store;
