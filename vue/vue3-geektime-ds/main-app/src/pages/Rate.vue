<script setup>
import {ref} from "vue";
import RateBar from "../components/RateBar.vue";

const score = ref(3.5)

</script>

<template>
  <h1>你的评分是 {{ score }}</h1>
  <RateBar v-model="score" theme="yellow">
    <span>为心爱的傻叉明星评分：</span>
  </RateBar>
</template>

<style scoped>

</style>