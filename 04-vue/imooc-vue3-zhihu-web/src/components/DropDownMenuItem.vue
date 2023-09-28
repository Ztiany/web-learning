<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DropDownMenuItem',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<template>
  <li class="dropdown-item" :class="{'is-disabled': disabled}">
    <slot></slot>
  </li>
</template>

<style scoped>
.dropdown-option.is-disabled * {
  color: #6c757d;
  /* The element is never the target  of pointer events; */
  pointer-events: none;
  background-color: transparent;
}
</style>
