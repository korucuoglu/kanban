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
            <h2 class="title">{{ element.title }}</h2>
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
  },
});

const changeTabItems = ($event) => {
  console.log($event.id);
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
      min-width: calc(25% - 24px);

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
  }
}
</style>

