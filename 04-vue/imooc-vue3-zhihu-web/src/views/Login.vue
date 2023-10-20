<template>
  <ValidateForm @form-submit="onSubmit">
    <div class="mb-3">
      <label class="form-label">邮箱地址</label>
      <validate-input :rules="emailRules" v-model="email"></validate-input>
    </div>
    <div class="mb-3">
      <label class="form-label">用户名</label>
      <validate-input :rules="nameRules"></validate-input>
    </div>
    <template #submit>
      <span class="btn btn-danger">Submit</span>
    </template>
  </ValidateForm>
  <div>{{ email }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'

const emailRules: RulesProp = [
  {
    type: 'required',
    message: '电子邮箱地址不能为空'
  },
  {
    type: 'email',
    message: '请输入正确的电子邮箱格式'
  }
]

const nameRules: RulesProp = [
  {
    type: 'required',
    message: '电子邮箱地址不能为空'
  }
]

const email = ref('')

const onSubmit = (result: boolean) => {
  console.log('OnSubmit:', result)
}

export default defineComponent({
  name: 'LoginPage',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    return {
      emailRules,
      nameRules,
      onSubmit,
      email
    }
  }
})
</script>

<style scoped>

</style>
