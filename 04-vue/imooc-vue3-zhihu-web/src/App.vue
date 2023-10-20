<template>
  <!-- 参考 Bootstrap 栅格系统：https://v5.getbootstrap.com/docs/5.0/layout/grid/ -->
  <div class="container">
    <!--  头部  -->
    <GlobalHeader :user="testUser"/>
    <!--  主体内容  -->
    <router-view></router-view>
    <!--  底部  -->
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import { defineComponent } from 'vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'

const testUser: UserProps = {
  isLogin: true,
  name: 'Alien'
}

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader
  },
  setup () {
    return {
      testUser
    }
  }
})
</script>

<style>

</style>
