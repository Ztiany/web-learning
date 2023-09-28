<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

export interface ColumnProps {
  id: number;
  title: string;
  avatar: string;
  description: string;
}

// 必须为默认导出
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      /*
       这里特别有一点，我们现在的 Array 是没有类型的，只是一个数组，我们希望它是一个 ColomnProps 的数组，那么我们
       是否可以使用了类型断言直接写成 ColomnProps[]，显然是不行的 ，因为 Array 是一个数组的构造函数不是类型，我们
       可以使用 PropType 这个方法，它接受一个泛型，讲 Array 构造函数返回传入的泛型类型。
       */
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnList = computed(() => {
      return props.list.map(item => {
        if (!item.avatar) {
          item.avatar = require('@/assets/logo.png')
        }
        return item
      })
    })
    console.log(props)
    return {
      columnList
    }
  }
})
</script>

<template>
  <div class="row">
    <div v-for="item in columnList" :key="item.id" class="col-4 mb-4">
      <!-- 参考 Bootstrap card：https://v5.getbootstrap.com/docs/5.0/components/card -->
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="item.avatar" :alt="item.title" class="rounded-circle border border-light w-25 my-3">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text  text-start">{{ item.description }}</p>
          <a href="#" class="btn btn-outline-primary">进入专栏</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
