<template>
  <draggable
    v-model="props.tabItems.items"
    group="item"
    @start="onDragStart"
    @end="onDragEnd"
    item-key="id"
  >
    <template #item="{ element }">
      <div class="item" :style="{ backgroundColor: element.color }" :data-task-id="element._id">
        <div class="top">
          <p class="title">{{ element.title }}</p>
          <div class="btn-set" @click="getTask(element, props.tabId)">
            <span></span>
          </div>
        </div>
        <p class="content" v-if="element.content">
          {{ element.content }}
        </p>
      </div>
    </template>
  </draggable>
</template>
<script setup>
import draggable from "vuedraggable";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  tabItems: {
    required: true,
    type: Object,
  },
  tabId: {
    required: true,
    type: String,
  },
});

// Drag & drop functionality with MongoDB integration

const getTask = (element, tabId) => {
  store.commit("setCurrentTask", [element, props.tabItems._id]);
};

let draggedTask = null;
let draggedFromTabId = null;

const onDragStart = (event) => {
  // Get task ID from data attribute
  const taskId = event.item?.dataset?.taskId;
  
  if (taskId) {
    // Find the task in the current tab's items
    draggedTask = props.tabItems.items.find(item => item._id === taskId);
    draggedFromTabId = props.tabItems._id;
  } else {
    draggedTask = null;
    draggedFromTabId = null;
  }
};

const onDragEnd = (event) => {
  // Check if task was moved to a different tab
  const toElement = event.to;
  let toTabId = null;
  
  if (toElement && toElement.closest) {
    const tabElement = toElement.closest('[data-tab-id]');
    toTabId = tabElement ? tabElement.getAttribute('data-tab-id') : null;
  }
  
  // If task was moved to a different tab, update MongoDB
  if (draggedTask && draggedFromTabId && toTabId && toTabId !== draggedFromTabId) {
    store.dispatch('moveTaskBetweenTabs', {
      fromTabId: draggedFromTabId,
      toTabId: toTabId,
      taskId: draggedTask._id
    });
  } else if (draggedTask && draggedFromTabId) {
    // Task was reordered within the same tab
    store.dispatch("updateTasksOrder", {
      tabId: draggedFromTabId,
      tasks: props.tabItems.items
    });
  }
  
  // Reset drag variables
  draggedTask = null;
  draggedFromTabId = null;
};
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

  &:hover .top .btn-set {
    visibility: visible;
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .title {
      font-size: 16px;
      font-weight: 500;
      line-height: 1.5;
      width: calc(100% - 30px);
      line-height: 1;
    }

    .btn-set {
      visibility: hidden;
      width: 26px;
      height: 26px;
      border-radius: 5px;
      cursor: pointer;
      position: relative;
      transition: 0.3s all;
      border: 1px solid transparent;

      &:hover {
        box-shadow: -1px 0px 4px -1px rgba(0, 0, 0, 0.479);

        span,
        span::before,
        span::after {
          background-color: #fff;
        }
      }

      span,
      span::after,
      span::before {
        content: "";
        position: absolute;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.7);
      }

      span {
        display: block;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);

        &::after {
          top: -6px;
        }

        &::before {
          bottom: -6px;
        }
      }
    }
  }

  .content {
    line-height: 1.4;
    font-size: 14px;
    opacity: 0.7;
  }

  @media screen and (max-width: 768px) {
    padding: 15px;
    .top .btn-set {
      visibility: visible;
    }
  }
}
</style>