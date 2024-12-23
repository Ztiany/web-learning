<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickOutsideDetector from '../hooks/ClickOutsideDetector'

export default defineComponent({
  name: 'DropDownMenu',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const dropdownRef = ref<null | HTMLElement>(null)
    const isOpen = ref(false)

    const isOutsideClicked = useClickOutsideDetector(dropdownRef)
    watch(isOutsideClicked, () => {
      if (isOpen.value && isOutsideClicked.value) {
        isOpen.value = false
      }
    })
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }

    return {
      isOpen,
      toggleOpen,
      dropdownRef
    }
  }
})
</script>

<template>
  <!--
    bootstrap dropdown 用法：https://v5.getbootstrap.com/docs/5.0/components/dropdowns/
    vue ref 用法：https://v3.vuejs.org/guide/composition-api-template-refs.html#template-refs
  -->
  <div class="dropdown" ref="dropdownRef">
    <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">
      {{ title }}
    </a>
    <ul class="dropdown-menu" style="display: block" v-if="isOpen">
      <!-- 参考 vue slot：https://v3.vuejs.org/guide/component-slots.html#slots -->
      <slot></slot>
    </ul>
  </div>
</template>

<style scoped>

</style>
