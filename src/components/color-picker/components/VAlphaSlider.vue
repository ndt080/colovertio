<template>
  <div class="alpha-slider" @mousedown.prevent.stop="onAlphaSelected($event)">
    <canvas class="alpha-slider__palette" ref="alphaSlider" />
    <div :style="caretStyle" class="alpha-slider__caret" />
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, onMounted, ref, watch } from "vue";
import { GradientUtil } from "../utils/gradient.util";
import type { RGBA } from "@/models/rgba.model";

interface VAlphaSliderProps {
  color: RGBA,
  width?: number,
  height?: number,
}

const props = withDefaults(defineProps<VAlphaSliderProps>(), {
  width: 30,
  height: 200,
});

const emits = defineEmits(['alpha-selected']);
const rgbaColor = computed(() => props.color);
const alphaSlider = ref<HTMLCanvasElement>();
const caretStyle = ref();

onMounted(() => {
  drawColorSlider();
  setCaretPosition(props.color.opacity, props.height);
});

watch(rgbaColor, () => {
  drawColorSlider();
  setCaretPosition(props.color.opacity, props.height);
});

const drawColorSlider = () => {
  const canvas = alphaSlider.value as HTMLCanvasElement;
  canvas.width = props.width;
  canvas.height = props.height;

  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  GradientUtil.setAlphaGradientToCanvas(context, props.color);
};

const setCaretPosition = (opacity: number, height: number) => {
  caretStyle.value = {
    top: opacity * height - 2 + 'px'
  }
}

const onAlphaSelected = (event: MouseEvent) => {
  onMouseMove(event);
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
};

const onMouseMove = (event: MouseEvent) => {
  const canvas = alphaSlider.value as HTMLCanvasElement;
  const { top } = canvas.getBoundingClientRect();

  let caretPosition = event.clientY - top;

  if (caretPosition < 0) caretPosition = 0;
  if (caretPosition > props.height) caretPosition = props.height;

  props.color.opacity = parseFloat((caretPosition / props.height).toFixed(2));
  setCaretPosition(props.color.opacity, props.height);
  emits('alpha-selected', props.color);
};

const onMouseUp = (event: MouseEvent) => {
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
};

</script>

<style lang="scss" scoped>
.alpha-slider {
  position: relative;
  cursor: pointer;
  overflow: hidden;

  &__palette {
    border-radius: 5px;
  }

  &__caret {
    position: absolute;
    left: 0;
    top: 60%;
    width: 100%;
    height: 3px;
    background: #fff;
    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.3);
    pointer-events: none;
  }
}
</style>