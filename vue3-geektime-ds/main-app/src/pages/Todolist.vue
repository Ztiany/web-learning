<script setup>
import {computed, ref, reactive} from 'vue'
import useStorage from "../utils/storage.js";

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

function removeTodo(e, i) {
  animate.el = e.target;
  animate.show = true;
  todos.value.splice(i, 1);
}

// 删除动画
function beforeEnter(el) {
  console.log("beforeEnter", el);
  let dom = animate.el;
  let rect = dom.getBoundingClientRect();
  //当前位置到窗口的右上角的距离
  let x = window.innerWidth - rect.left - 60;
  let y = rect.top - 10;
  el.style.transform = `translate(-${x}px, ${y}px)`;
}

function enter(el) {
  console.log("enter", el);
  /*
  看起来似乎是执行了不必要的操作，即调用 document.body.offsetHeight;，然后设置了元素的 transform 样式。
  然而，这实际上是一种常见的技巧，通常用于触发浏览器的重绘（repaint）或重排（reflow）操作，以确保 CSS 动画能够正常工作。

  这种技巧的背后是浏览器的优化机制。在某些情况下，浏览器会对一组 CSS 变化进行批处理，以提高性能。
  这意味着如果您立即设置一个 CSS 属性并尝试启动动画，浏览器可能会将这两个操作合并在一起，而不是按预期顺序执行。
  这可能导致动画效果不如预期或不生效。

  通过在设置 CSS 属性之前调用 document.body.offsetHeight;，您实际上在两个操作之间插入了一个强制浏览器重排的操作。
  这迫使浏览器先执行重排，然后再执行样式变化，从而确保动画效果按预期进行。

  这种做法通常被称为“强制重排”或“触发重排”，它是一种解决特定 CSS 动画问题的常见技巧。
  需要注意的是，这不是最优的性能实践，因为强制重排可能会导致性能损失。
  但在某些情况下，它是一种可行的解决方案，特别是在需要确保动画流畅性的情况下。

  请注意，这个技巧可能不是在所有情况下都需要的，具体取决于您的代码结构和浏览器的实现。
  如果您的动画正常工作而没有性能问题，您可能不需要使用这种技巧。
   */
  document.body.offsetHeight;
  el.style.transform = `translate(0,0)`;
}

function afterEnter(el) {
  console.log("afterEnter", el);
  animate.show = false
  el.style.display = 'none'
}

let animate = reactive({
  show: false,
  el: null,
});

</script>

<template>
  <div>
    <span class="dustbin">🗑</span>
    <input type="text" v-model="title"/>
    <button @click="addTodoItem">添加</button>

    <transition-group
        v-if="todos.length"
        name="flip-list"
        tag="ul">
      <li v-for="(todo, index) in todos" :key="todo.title">
        <input type="checkbox" v-model="todo.done"/>
        <span :class="{done:todo.done}">{{ todo.title }}</span>
        <button @click="removeTodo($event,index)">删除</button>
      </li>
    </transition-group>
    <div v-else>暂无代办事项</div>

    <div>
      <span>统计：{{ active }}/{{ all }}</span>
      |
      <span>全选 <input type="checkbox" v-model="allDone"/></span>
      <span v-if="active<all">| <button @click="clearDone">清空已办</button></span>
    </div>

    <div class="animate-wrap">
      <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div class="animate" v-show="animate.show">📋</div>
      </transition>
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

.flip-list-move {
  transition: transform 0.8s ease;
}

.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 1s ease;
}

.flip-list-enter-from,
.flip-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.dustbin {
  font-size: 20px;
  position: fixed;
  right: 10px;
  top: 10px;
}

.animate-wrap .animate {
  position: fixed;
  right: 10px;
  top: 11px;
  z-index: 100;
  transition: all 0.5s linear;
}
</style>