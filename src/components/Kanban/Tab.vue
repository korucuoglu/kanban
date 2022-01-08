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
              />
            </div>
            <div class="items">
              <Item :tabItems="element" :tabId="element.id" />
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

const tabTitleChange = (event, element) => {
  setTimeout(() => {
    element.title = event.target.value;
  }, 1000);
};
</script>

<style scoped lang="scss">
$tab-background: #262626;
.tab {
  width: 100%;
  overflow-x: auto;
  padding-top: 4rem;
  max-width: max-content;

  .tab-items {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .tab-cover {
      padding: 0 12px;
      width: calc(25% - 24px);
      pointer-events: none;
      display: flex;
      justify-content: center;
      align-items: flex-start;

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
        width: 100%;
        max-width: 368px;
        pointer-events: all;
        cursor: grabbing;
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

  @media screen and (max-width: 1300px) {
    width: 100%;
    padding: 5rem;

    .tab-items {
      .tab-cover {
        width: calc(25% - 24px);
        .tab-content {
          width: 100%;
          max-width: 370px;
          padding: 18px;

          .title {
            margin-bottom: 25px;

            input {
              font-size: 34px;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1100px) {
    width: 100%;
    padding: 4rem;

    .tab-items {
      justify-content: flex-start;
      .tab-cover {
        min-width: 320px;

        .tab-content {
          width: 100%;
          max-width: 370px;
          padding: 18px;

          .title {
            margin-bottom: 16px;

            input {
              font-size: 28px;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 576px) {
    width: 100%;
    padding: 4rem 1rem;

    .tab-items {
      justify-content: flex-start;
      .tab-cover {
        min-width: 250px;

        .tab-content {
          width: 100%;
          max-width: 370px;
          pointer-events: all;
          padding: 18px;

          .title {
            margin-bottom: 16px;

            input {
              font-size: 28px;
            }
          }
        }
      }
    }
  }
}
</style>

