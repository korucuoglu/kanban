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
import { watch } from "vue";
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
    type: Number,
  },
});

watch(props.tabItems, () => {
  store.commit("updateItems", props.tabItems);
});

const getTask = (element, tabId) => {
  store.commit("setCurrentTask", [element, tabId]);
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