<template>
  <div class="tab" v-for="tab in tabs" :key="tab.id">
    <div class="tab-content">
      <h2 class="title">{{ tab.title }}</h2>
      <div class="items">
        <Item :tabItems="tab.items" />
      </div>
    </div>
  </div>
</template>

<script setup >
import { computed } from "vue";
import { useStore } from "vuex";

import Item from "./Item.vue";
const store = useStore();

const tabs = computed(() => store.getters._getTabs);
</script>

<style scoped lang="scss">
$tab-background: #262626;
.tab {
  max-width: calc(25% - 24px);
  padding: 0 12px;
  .tab-content {
    background-color: $tab-background;
    color: #fff;
    padding: 24px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 37px;
      font-weight: 600;
      margin-bottom: 24px;
    }
    .items {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>

