<script setup>
import {ref, computed} from "vue";

// 定义组件的 props
let props = defineProps({
  modelValue: Number,
  theme: {
    type: String,
    default: "orange",
  }
});

const score = ref(props.modelValue);

function onMouseOut() {
  console.log("RateBar.vue: onMouseOver: value = ", props.modelValue);
  score.value = props.modelValue;
}

function onMouseOver(value) {
  console.log("RateBar.vue: onMouseOver: value = ", value);
  score.value = value;
}

// 定义 emits
let emits = defineEmits(["update:modelValue"]);

function onRate(value) {
  emits("update:modelValue", value);
}

const fontWidth = computed(() => {
  return `width:${score.value}em`;
});

const themeObj = {
  black: "#000",
  white: "#fff",
  red: "#f5222d",
  orange: "#fa541c",
  yellow: "#fadb14",
  green: "#73d13d",
  blue: "#40a9ff",
};

const fontStyle = computed(() => {
  return `color:${themeObj[props.theme]};`;
});
</script>


<template>
  <slot></slot>
  <div :style="fontStyle">
    <div class="rate" @mouseout="onMouseOut">
      <span v-for="index in 5" :key="index" @mouseover="onMouseOver(index)">☆</span>

      <span class="hallow" :style="fontWidth">
        <span v-for="index in 5" :key="index" @mouseover="onMouseOver(index)" @click="onRate(index)">★</span>
      </span>
    </div>
  </div>
</template>


<style scoped>
.rate {
  position: relative;
  /*
  "子绝父相"布局通常需要一个能够提供明确宽度和高度的父元素，以便子元素可以相对于这个父元素进行定位。
  行内元素的排列方式通常不适合这种布局需求，而块级元素和 inline-block 元素通常更适合作为父元素。

  行内元素默认情况下不会自动扩展以填充其父元素的宽度。它们只会根据其内容的大小进行布局，不会主动撑开父元素的宽度。

  当子元素使用绝对定位相对于行内元素的父元素进行定位时，由于父元素的宽度不会自动扩展，可能会导致子元素无法得到正确的布局。
  父元素的宽度不会自动适应子元素，因此子元素的定位可能不符合预期。
  */
  display: inline-block;
}

.hallow {
  display: inline-block;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
}

</style>