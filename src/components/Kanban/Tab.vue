<template>
  <div class="tab">
    <draggable
      v-model="tabs"
      group="tab"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
      class="tab-items"
    >
      <template #item="{ element }">
        <div class="tab-cover">
          <div class="tab-content">
            <div class="title">
              <input
                type="text"
                :value="element.title"
                @blur="tabTitleChange($event, element)"
                :name="element.title"
              />
            </div>
            <div class="items">
              <Item :tabItems="element" />
            </div>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>


<script setup >
import { computed } from "vue";
import { useStore } from "vuex";
import draggable from "vuedraggable";

import Item from "./Item.vue";
const store = useStore();

const tabs = computed({
  get() {
    return store.getters._getTabs;
  },
  set(val) {
    store.commit("updateList", val);
    console.log(val);
  },
});

const tabTitleChange = (event, element) => {
  setTimeout(() => {
    element.title = event.target.value;
  }, 2000);
};
</script>

<style scoped lang="scss">
$tab-background: #262626;
.tab {
  width: 100%;

  .tab-items {
    display: flex;
    justify-content: center;

    .tab-cover {
      padding: 0 12px;
      /* width: calc(25% - 24px); */
      cursor: grabbing;
      .title-board {
        font-size: 50px;
        color: #fff;
      }

      .tab-content {
        background-color: $tab-background;
        color: #fff;
        padding: 24px;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        width: 368px;
        .title {
          margin-bottom: 24px;

          input {
            border: none;
            background-color: transparent;
            outline: none;
            color: #fff;
            font-size: 37px;
            font-weight: 600;
            overflow: hidden;
            max-width: 100%;
            text-overflow: ellipsis;
          }
        }
        .items {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
}
</style>

