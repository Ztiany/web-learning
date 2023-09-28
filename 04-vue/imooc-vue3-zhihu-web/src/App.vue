<template>
  <!-- 参考 Bootstrap 栅格系统：https://v5.getbootstrap.com/docs/5.0/layout/grid/ -->
  <div class="container">
    <GlobalHeader :user="testUser"/>
    <ColumnList :list="testData"/>
  </div>
</template>

<script lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import { defineComponent } from 'vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'

const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: '这是的test3专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这是的test4专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  }
]

const testUser: UserProps = {
  isLogin: true,
  name: 'Alien'
}

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    ColumnList
  },
  setup () {
    return {
      testData,
      testUser
    }
  }
})
</script>

<style>

</style>
