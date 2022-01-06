<template>
  <div class="main">
    <a
      class="btn-primary add-task-btn"
      @click="tabOptions = true"
      :disabled="tabOptions == true"
      ><span>+</span>Add Task</a
    >
    <TaskOptions
      v-if="tabOptions || getCurrentTask"
      @closeBtnTask="closeBtnTask"
    />
    <Tab />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import Tab from "./Tab.vue";
import TaskOptions from "./TaskOptions.vue";

const store = useStore();

const tabOptions = ref(false);

const closeBtnTask = (event) => {
  tabOptions.value = event;
  if (getCurrentTask.value != null) {
    store.commit("setCurrentTask", null);
  }
};

const getCurrentTask = computed(() => {
  return store.getters._getCurrentTask;
});
</script>

<style scoped lang="scss">
.main {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 100px 0;
  position: relative;
  width: 100%;
  height: 100%;
  .add-task-btn {
    margin-bottom: 4rem;

    span {
      line-height: 1;
      vertical-align: text-top;
      margin-right: 3px;
    }
  }
}
</style>