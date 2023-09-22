<script setup>

</script>


<template>
  <div>
    <router-link to="/">首页</router-link>
    |
    <router-link to="/todolist">清单</router-link>
    |
    <router-link to="/about">关于</router-link>
    |
    <router-link to="/rate">评分</router-link>
  </div>

  <router-view></router-view>
</template>


<style scoped>

</style>