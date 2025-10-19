<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  // Initialize tabs from MongoDB
  store.dispatch('initializeTabs');
});
</script>