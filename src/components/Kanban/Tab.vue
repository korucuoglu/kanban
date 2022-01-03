<template>
  <div class="tab">
    <div class="tab-content">
      <h2 class="title">Backlog</h2>
      <div class="items">
        <TabItem v-for="i in 4" />
      </div>
    </div>
  </div>
</template>

<script setup >
import TabItem from "./TabItem.vue";
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

