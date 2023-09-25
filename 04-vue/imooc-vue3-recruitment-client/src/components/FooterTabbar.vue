<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();
const gotoPage = (path: string) => {
  router.push(path);
}
</script>

<template>
  <dl>
    <dt class="icon-task-bar" :class="route.path=='/task'?'active':''" @click="gotoPage('/task')">
      <i></i>
      <p>任务</p>
    </dt>
    <dt class="icon-contract-bar" :class="route.path=='/contract'?'active':''" @click="gotoPage('/contract')">
      <i></i>
      <p>合约</p>
    </dt>
    <dt class="icon-message-bar" :class="route.path=='/message'?'active':''" @click="gotoPage('/message')">
      <i></i>
      <p>消息</p>
    </dt>
    <dt class="icon-my-bar" :class="route.path=='/my'?'active':''" @click="gotoPage('/my')">
      <i></i>
      <p>我的</p>
    </dt>
  </dl>
</template>

<style scoped>

dl {
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  border-top: 1px solid #DDDDDD;
  height: 3rem;
  width: 100%;
  background: #ffffff;
}

dl dt {
  padding: 0.69rem 0;

  flex: 1;
  justify-content: center;

  text-align: center;
  font-size: 0.59rem;
  font-family: PingFang SC, serif;
  font-weight: 400;
  color: #666666;
}

dl dt i {
  width: 0.91rem;
  height: 0.91rem;
  display: block;
  margin: 0 auto;
}

.icon-task-bar i {
  background: url('@/assets/img/icon/bar-task-link.png') no-repeat;
  background-size: 100%;
}

.icon-task-bar.active i {
  background: url('@/assets/img/icon/bar-task-active.png') no-repeat;
  background-size: 100%;
}

.icon-contract-bar i {
  background: url('@/assets/img/icon/bar-contract-link.png') no-repeat;
  background-size: 100%;
}

.icon-contract-bar.active i {
  background: url('@/assets/img/icon/bar-contract-active.png') no-repeat;
  background-size: 100%;
}

.icon-message-bar i {
  background: url('@/assets/img/icon/bar-message-link.png') no-repeat;
  background-size: 100%;
}

.icon-message-bar.active i {
  background: url('@/assets/img/icon/bar-message-active.png') no-repeat;
  background-size: 100%;
}

.icon-my-bar i {
  background: url('@/assets/img/icon/bar-my-link.png') no-repeat;
  background-size: 100%;
}

.icon-my-bar.active i {
  background: url('@/assets/img/icon/bar-my-active.png') no-repeat;
  background-size: 100%;
}

dl dt.active p {
  color: #ff9415;
}
</style>