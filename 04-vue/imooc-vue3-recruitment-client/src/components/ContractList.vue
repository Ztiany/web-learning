<script setup lang="ts">

</script>

<template>
  <dl>
    <dd>
      <h3>移动端小程序前端开发工程师</h3>
      <span>
        履约中<van-icon name="arrow"/>
      </span>
    </dd>

    <dt>
      <label>公司名称</label>
      <span></span>
    </dt>

    <dt>
      <label>合约类型</label>
      <span></span>
    </dt>

    <dt>
      <label>合约周期</label>
      <span></span>
    </dt>

    <dt>
      <label>签约时间</label>
      <span></span>
    </dt>

    <dt>
      <label>合约进度</label>
      <span></span>
    </dt>

    <dt class="contract-progress">

    </dt>

  </dl>
</template>

<style scoped>

dl {
  font-size: 0.64rem;
  color: #666666;
  padding: 1rem 0.7rem;
  border-bottom: 1px solid #eeeeee;
}

dl dd {
  display: flex;
  margin-bottom: 0.9rem;
  align-items: center;
}

dl dd h3 {
  font-size: 0.8rem;
  font-weight: 500;
  color: #333333;
  flex: 1;
}

dl dd span {
  text-align: right;
  font-size: 0.75rem;
  color: #FF9415;
}

dl dd i {
  font-size: 0.75rem;
}

dl dt {
  display: flex;
  margin-bottom: 0.72rem;
}

dl dt:last-child {
  margin-bottom: 0;
}

dl dt label{
  flex: 1;
}

dl dt span{
  text-align: right;
}
</style>