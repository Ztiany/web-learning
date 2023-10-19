<template>
  <!-- 关于 Bootstrap 表单，参考：https://getbootstrap.com/docs/5.3/forms/overview/ -->
  <!-- 关于 $attrs 用法，参考：https://v2.vuejs.org/v2/guide/components-props#Non-Prop-Attributes -->
  <div class="validate-input-container pb-3">
    <input type="text"
           class="form-control"
           :class="{'is-invalid':inputRef.error}"
           :value="inputRef.val"
           @blur="validateInput"
           @input="updateValue"
           v-bind="$attrs"
    >
    <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, onMounted } from 'vue'
import { emitter } from './ValidateForm.vue'

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

interface RuleProp {
  type: 'required' | 'email',
  message: string,
}

export type RulesProp = RuleProp[]

export default defineComponent({
  props: {
    rules: { type: Array as PropType<RulesProp> },
    /* 参考：https://v3.vuejs.org/guide/migration/v-model.html#overview */
    modelValue: String
  },
  name: 'ValidateInput',
  /* 关于inheritAttrs 用法，参考：https://v2.vuejs.org/v2/guide/components-props#Non-Prop-Attributes */
  inheritAttrs: false,
  setup (props, context) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: props.modelValue
    })
    const validateInput = () => {
      // 没有规则
      if (!props.rules) {
        return true
      }
      // 校验规则
      const allPassed = props.rules.every(rule => {
        let passed = true
        inputRef.message = rule.message
        switch (rule.type) {
          case 'required': {
            passed = inputRef.val.trim() !== ''
            break
          }
          case 'email': {
            passed = emailReg.test(inputRef.val)
            break
          }
          default: {
            break
          }
        }
        return passed
      })
      // 赋值校验后的结果
      inputRef.error = !allPassed
      return allPassed
    }

    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }

    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })

    return {
      inputRef,
      validateInput,
      updateValue
    }
  }
})
</script>

<style scoped>

</style>
