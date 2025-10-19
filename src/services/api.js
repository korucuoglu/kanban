import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api'  // Production'da relative path kullan
  : 'http://localhost:3001/api'; // Development için localhost

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tab CRUD operations
export const tabService = {
  // Get all tabs
  async getAllTabs() {
    try {
      const response = await api.get('/tabs');
      return response.data;
    } catch (error) {
      console.error('Error fetching tabs:', error);
      throw error;
    }
  },

  // Create new tab
  async createTab(tabData) {
    try {
      const response = await api.post('/tabs', tabData);
      return response.data;
    } catch (error) {
      console.error('Error creating tab:', error);
      throw error;
    }
  },

  // Update tab
  async updateTab(tabId, tabData) {
    try {
      const response = await api.put(`/tabs/${tabId}`, tabData);
      return response.data;
    } catch (error) {
      console.error('Error updating tab:', error);
      throw error;
    }
  },

  // Delete tab
  async deleteTab(tabId) {
    try {
      const response = await api.delete(`/tabs/${tabId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting tab:', error);
      throw error;
    }
  },
};

// Task CRUD operations
export const taskService = {
  // Add task to tab
  async addTask(tabId, taskData) {
    try {
      const response = await api.post(`/tabs/${tabId}/tasks`, taskData);
      return response.data;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  },

  // Update task
  async updateTask(tabId, taskId, taskData) {
    try {
      const response = await api.put(`/tabs/${tabId}/tasks/${taskId}`, taskData);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  // Delete task
  async deleteTask(tabId, taskId) {
    try {
      const response = await api.delete(`/tabs/${tabId}/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  // Move task between tabs
  async moveTask(fromTabId, toTabId, taskId) {
    try {
      const response = await api.put(`/tabs/${fromTabId}/tasks/${taskId}/move`, {
        toTabId,
      });
      return response.data;
    } catch (error) {
      console.error('Error moving task:', error);
      throw error;
    }
  },
};

export default api;
