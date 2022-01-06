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
        <a class="btn-primary" @click="addTask">Add</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, defineEmits } from "vue";
import { useStore } from "vuex";

const store = useStore();

const state = reactive({
  taskTitle: "Task Title",
  taskContent: "Task content...",
  taskColor: "#C340A1",
});

const emit = defineEmits(["closeBtnTask"]);
// Task eklendikten sonra kapanmasi icin index componentine kapanmasi icin event gonderiyoruz.

const closeBtnTask = () => {
  emit("closeBtnTask", false);
};

const addTask = () => {
  store.commit("addTask", {
    id: new Date().getTime(),
    title: state.taskTitle,
    color: state.taskColor,
    content: state.taskContent,
  });

  closeBtnTask();
};
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
      width: 100%;
      font-weight: 400;
      font-size: 18px;
      margin-top: 2rem;
    }

    .btn-con {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>