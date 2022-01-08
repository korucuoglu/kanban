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

const addTask = () => {
  store.commit("addTask", taskInfo.value);

  closeBtnTask();
};

const updateTask = () => {
  store.commit("updateTask", [taskInfo.value, getCurrentTask.value[1]]);
  store.commit("setCurrentTask", null);
};

const deleteTask = () => {
  store.commit("deleteTask", [taskInfo.value, getCurrentTask.value[1]]);
  store.commit("setCurrentTask", null);
};

if (getCurrentTask.value != null) {
  state.id = getCurrentTask.value[0].id;
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