<template>
  <div class="add-task">
    <div class="in">
      <div class="top">
        <input class="title" v-model="state.taskTitle" />
        <span @click="closeBtnTask"></span>
      </div>
      <div class="task-color">
        <label for="task-color"
          >Task Color:
          <input type="color" v-model="state.taskColor" id="task-color" />
        </label>
      </div>

      <div class="task-tab" v-if="getCurrentTask">
        <label for="task-tab">Move to Tab:</label>
        <select v-model="state.selectedTabId" id="task-tab">
          <option v-for="tab in tabs" :key="tab._id" :value="tab._id">
            {{ tab.title }}
          </option>
        </select>
      </div>

      <textarea class="content" v-model="state.taskContent" />
      <div class="btn-con">
        <a class="btn-primary" v-if="!getCurrentTask" @click="addTask">Add</a>
        <div v-else>
          <a class="btn-primary danger" @click="deleteTask">Delete</a>
          <a class="btn-primary" @click="updateTask">Update</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const state = reactive({
  id: new Date().getTime(),
  taskTitle: "Task Title",
  taskContent: "Task content...",
  taskColor: "#C340A1",
  selectedTabId: "",
});

const emit = defineEmits(["closeBtnTask"]);
// Task eklendikten sonra kapanmasi icin index componentine kapanmasi icin event gonderiyoruz.

const closeBtnTask = () => {
  emit("closeBtnTask", false);
};

const taskInfo = computed(() => {
  return {
    id: state.id,
    title: state.taskTitle,
    color: state.taskColor,
    content: state.taskContent,
  };
});

const getCurrentTask = computed(() => {
  return store.getters._getCurrentTask;
  // Get Currentte hem tabId hem de objenin kendisi tutuldugu icin dizinin 1. elemani olan objeyi direkt aldik. Dizinin ikinci elemani tabId.
});

const tabs = computed(() => {
  return store.getters._getTabs;
});

const addTask = () => {
  store.dispatch("addTask", {
    title: state.taskTitle,
    color: state.taskColor,
    content: state.taskContent,
  });

  closeBtnTask();
};

const updateTask = () => {
  // Update task data with current form values
  const updatedTask = {
    ...getCurrentTask.value[0],
    title: state.taskTitle,
    color: state.taskColor,
    content: state.taskContent,
  };
  
  // Check if task should be moved to a different tab
  if (state.selectedTabId && state.selectedTabId !== getCurrentTask.value[1]) {
    // Move task to different tab
    store.dispatch('moveTaskBetweenTabs', {
      fromTabId: getCurrentTask.value[1],
      toTabId: state.selectedTabId,
      taskId: updatedTask._id
    });
  } else {
    // Just update task in current tab
    store.dispatch("updateTask", [updatedTask, getCurrentTask.value[1]]);
  }
  
  store.commit("setCurrentTask", null);
};

const deleteTask = () => {
  store.dispatch("deleteTask", [getCurrentTask.value[0], getCurrentTask.value[1]]);
  store.commit("setCurrentTask", null);
};

if (getCurrentTask.value != null) {
  state.id = getCurrentTask.value[0]._id || getCurrentTask.value[0].id;
  state.taskTitle = getCurrentTask.value[0].title;
  state.taskContent = getCurrentTask.value[0].content;
  state.taskColor = getCurrentTask.value[0].color;
}
</script>

<style scoped lang="scss">
.add-task {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    background-color: rgba($color: #000000, $alpha: 0.3);
    backdrop-filter: blur(5px);
  }

  .in {
    background-color: #262626;
    position: fixed;
    z-index: 2;
    width: 40%;
    max-width: 750px;
    transform: translateX(-50%);
    border-radius: 25px;
    padding: 45px 45px 35px 45px;
    top: 100px;

    .title,
    .content {
      background-color: transparent;
      border: none;
      outline: none;
      color: #fff;
    }

    .top {
      display: flex;
      align-items: center;
      margin-bottom: 50px;
      .title {
        font-size: 35px;
        font-weight: 600;

        width: calc(100% - 20px);
        line-height: 1;
      }
      span {
        display: block;
        width: 20px;
        height: 20px;
        position: relative;
        cursor: pointer;

        &::after,
        &::before {
          content: "";
          background-color: #fff;
          width: 100%;
          height: 3px;
          position: absolute;
          top: 8px;
          transition: 0.3s all;
        }

        &::before {
          transform: rotate(-45deg);
        }

        &::after {
          transform: rotate(45deg);
        }

        &:hover::after {
          transform: rotate(-45deg);
        }
      }
    }

    .task-color {
      color: #fff;
      outline: 0;

      label {
        display: flex;
        align-items: center;
        input {
          margin-left: 1rem;
        }
      }
    }

    .task-tab {
      color: #fff;
      margin-top: 1rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
      }

      select {
        background-color: #333;
        color: #fff;
        border: 1px solid #555;
        padding: 0.5rem;
        border-radius: 4px;
        width: 100%;
      }
    }

    .content {
      resize: none;
      height: 300px;
      max-height: 20vh;
      width: 100%;
      font-weight: 400;
      font-size: 18px;
      margin-top: 2rem;
    }

    .btn-con {
      display: flex;
      justify-content: flex-end;

      .btn-primary.danger {
        margin-right: 1rem;
      }
    }
  }

  @media screen and (max-width: 768px) {
    overflow-y: auto;
    .in {
      top: 15vh;
      margin-bottom: 4rem;
      overflow-y: auto;
      width: 90%;
      .top {
        .title {
          font-size: 23px;
        }
      }

      .content {
        font-size: 14px;
      }
    }
  }
}
</style>