<script setup>
/* ============================== 累加器  ============================== */
import {ref} from 'vue'
import {useFullscreen} from "@vueuse/core";

let counter = ref(0);

function addCount() {
  counter.value++;
}

/* ============================== FullScreen  ============================== */
let {isFullscreen, enter, exit, toggle} = useFullscreen();
</script>

<template>
  <h1>这是首页</h1>

  <!-- ============================== 累加器  ============================== -->
  <div>
    <h2 @click="addCount">Counter: {{ counter }}</h2>
  </div>

  <div>
    <button @click="enter">全屏</button>
    |
    <button @click="exit">退出全屏</button>
  </div>

</template>

<style scoped>

</style>