<script setup lang="ts">
import {reactive} from "vue";
import FooterTabBar from "@/components/FooterTabbar.vue";
import TaskList from "@/components/TaskList.vue";

const taskList = reactive([
  {
    task_id: 1,
  },
])

</script>

<template>
  <TaskList v-bind:task-list="taskList"/>
  <FooterTabBar/>
</template>

<style scoped>

</style>