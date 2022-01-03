<template>
  <div class="item" v-for="tabItem in props.tabItems">
    <p class="title">{{ tabItem.title }}</p>
    <p class="content">{{ tabItem.content }}</p>
  </div>
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps({
  tabItems: {
    required: true,
    type: Array,
  },
});

console.log(props);
</script>

<style scoped lang="scss">
.item {
  background-color: blueviolet;
  padding: 24px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  &:not(:last-child) {
    margin-bottom: 16px;
  }
  .title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
    line-height: 1.5;
  }
  .content {
    line-height: 1.4;
    font-size: 14px;
    opacity: 0.7;
  }
}
</style>