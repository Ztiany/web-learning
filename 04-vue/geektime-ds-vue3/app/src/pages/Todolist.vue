<script setup>
/* ============================== 累加器  ============================== */
import {computed, ref} from 'vue'
import useStorage from "../utils/storage.js";
import {useFullscreen} from "@vueuse/core";

let counter = ref(0);

function addCount() {
  counter.value++;
}

/* ============================== FullScreen  ============================== */
let {isFullscreen, enter, exit, toggle} = useFullscreen();

/* ============================== To-do List  ============================== */
/* 用一个函数封装 To-do List 的所有的逻辑。 */
function useTodos() {

  let title = ref("");
  let todos = useStorage("todo_data--", []);

  function addTodoItem() {
    todos.value.push({title: title.value, done: false});
    title.value = "";
  }

  function clearDone() {
    todos.value = todos.value.filter(todo => !todo.done);
  }

  let active = computed(() => todos.value.filter(todo => !todo.done).length);
  let all = computed(() => todos.value.length);

  let allDone = computed({
    get() {
      return active.value === 0 && todos.value.length > 0;
    },
    set(value) {
      todos.value.forEach(todo => todo.done = value);
    }
  });
  return {title, todos, addTodoItem, clearDone, active, all, allDone};
}

let {title, todos, addTodoItem, clearDone, active, all, allDone} = useTodos();

</script>

<template>

  <!-- ============================== 累加器  ============================== -->
  <div>
    <h2 @click="addCount">Counter: {{ counter }}</h2>
  </div>

  <div>
    <button @click="enter">全屏</button>
    |
    <button @click="exit">退出全屏</button>
  </div>

  <!--  ============================== To-do List  ============================== -->
  <div>
    <input type="text" v-model="title"/>
    <button @click="addTodoItem">添加</button>
    <ul v-if="todos.length">
      <li v-for="(todo, index) in todos">
        <input type="checkbox" v-model="todo.done"/>
        <span :class="{done:todo.done}">{{ todo.title }}</span>
      </li>
    </ul>
    <div v-else>暂无代办事项</div>
    <div>
      <span>统计：{{ active }}/{{ all }}</span>
      |
      <span>全选 <input type="checkbox" v-model="allDone"/></span>
      <span v-if="active<all">| <button @click="clearDone">清空已办</button></span>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: red;
}

.done {
  text-decoration: line-through;
  color: rgb(128, 128, 128);
}
</style>