<template>
  <div class="main">
    <Tab />
  </div>
</template>

<script setup>
import Tab from "./Tab.vue";
</script>

<style scoped lang="scss">
.main {
  display: flex;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  margin-top: 150px;
}
</style>