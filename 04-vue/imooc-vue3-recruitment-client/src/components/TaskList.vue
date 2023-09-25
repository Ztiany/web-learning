<script setup lang="ts">
import {useRouter} from "vue-router";

const props = defineProps({
  taskList: {
    type: Array,
    default: () => []
  }
})

const router = useRouter();
const gotoTaskDetail = (id: string) => {
  router.push('/task/details/' + id)
}
</script>

<template>
  <div class="task-item" v-for="item in taskList" :key="item.id" @click="gotoTaskDetail(item.task_id)">

    <div class="task-item-top" @click="gotoTaskDetail('1')">
      <h3>移动端小程序开发</h3>
      <span>紧急</span>
    </div>

    <dl class="task-item-info">
      <dt>
        <h5>任务预算</h5>
        <strong>￥100000</strong>
      </dt>
      <dt>
        <h5>任务周期</h5>
        <strong>90 天</strong>
      </dt>
      <dt>
        <h5>服务方式</h5>
        <strong>驻场</strong>
      </dt>
    </dl>

    <p>任务要求：混合开发小程序，与后端对接接口，有 2 年以上 web 前端开发经验，能够独立开展 Web 前端开发工作。</p>

    <div class="task-item-bottom">
      <label>北京驻场无忧科技有限公司</label>
      <span><van-icon name="location-o"/>北京</span>
    </div>
  </div>

</template>

<style scoped>

.task-item {
  background: #FFFFFF;
  border-radius: 0.53rem;
  margin: 0 0 0.53rem;
  padding: 0.88rem 0.48rem 0.75rem;
  position: relative;
  font-size: 0.69rem;
  font-weight: 100;
  color: #666666;
}

.task-item-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.01rem;
}

.task-item-top h3 {
  font-size: 0.91rem;
  line-height: 0.91rem;
  font-weight: 400;
  color: #333333;
}

.task-item-top span {
  width: 2.29rem;
  height: 1.08rem;
  line-height: 1.08rem;
  background: linear-gradient(90DEG, #FEA829, #FE8F27);
  border-radius: 0.53rem 0 0 0.53rem;
  text-align: center;
  font-size: 0.59rem;
  color: #FFFFFF;
}

dl {
  display: flex;
  margin-bottom: 0.8rem;
}

dl dt {
  margin-right: 1.44rem;
}

dl dt h5 {
  font-size: 0.69rem;
  line-height: 0.69rem;
  margin-bottom: 0.53rem;
  font-weight: 100;
  color: #999999;
}

dl dt strong {
  font-size: 0.64rem;
  line-height: 0.64rem;
  display: block;
  font-weight: 500;
  color: #333333;
}

.task-item p {
  color: #333333;
  /* 文本缩略的固定写法，下面的几个属性是为了兼容 webkit 内核。 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.task-item-bottom {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #f5f5f5;
  margin-top: 0.72rem;
  padding-top: 0.72rem;
  line-height: 0.69rem;
}

.task-item-bottom i {
  font-size: 0.8rem;
  font-weight: 600;
  margin-right: 0.1rem;
}
</style>