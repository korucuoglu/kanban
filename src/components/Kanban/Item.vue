<template>
  <draggable
    v-model="props.tabItems.items"
    group="item"
    @start="drag = true"
    @end="drag = false"
    item-key="id"
  >
    <template #item="{ element }">
      <div class="item" :style="{ backgroundColor: element.color }">
        <p class="title">{{ element.title }}</p>
        <p class="content" v-if="element.content">
          {{ element.content }}
        </p>
      </div>
    </template>
  </draggable>
</template>
<script setup>
import { defineProps } from "vue";
import draggable from "vuedraggable";

const props = defineProps({
  tabItems: {
    required: true,
    type: Object,
  },
});
</script>

<style scoped lang="scss">
.item {
  background-color: blueviolet;
  padding: 24px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  cursor: grabbing;
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