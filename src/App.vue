<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

let refreshInterval;

onMounted(() => {
  // Initialize tabs from MongoDB
  store.dispatch('initializeTabs');
  
  // Auto-refresh every 30 seconds to prevent conflicts
  refreshInterval = setInterval(() => {
    store.dispatch('refreshTabs');
  }, 30000);
});

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
});
</script>