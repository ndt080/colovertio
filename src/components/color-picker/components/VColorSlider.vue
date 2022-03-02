<template>
  <div class="color-slider" @mousedown.prevent.stop="onColorSelected">
    <canvas class="color-slider__palette" ref="colorSlider" />
    <div :style="caretStyle" class="color-slider__caret" />
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, onMounted, ref, watch } from "vue";
import { GradientUtil } from "../utils/gradient.util";
import { RGBA } from "@/models/rgba.model";
import type { HSV } from "@/models/hsv.model";
import { DefaultColorOptions } from "../consts/default-color-options.const";
import { ColorConverter } from "@/utils/color-converter.util";

interface VColorSliderProps {
  hsvColor?: HSV,
  colorOpacity?: number,
  width?: number,
  height?: number,
}

const props = withDefaults(defineProps<VColorSliderProps>(), {
  hsvColor: () => DefaultColorOptions.hsvColor,
  width: 30,
  height: 200,
});

const emits = defineEmits(['color-selected']);
const hsvColor = computed(() => props.hsvColor);
const colorSlider = ref<HTMLCanvasElement>();
const caretStyle = ref();

onMounted(() => {
  drawColorSlider();
  setCaretPosition(props.hsvColor, props.height)
});

watch(hsvColor, () => {
  drawColorSlider();
  setCaretPosition(props.hsvColor, props.height);
});

const drawColorSlider = () => {
  const canvas = colorSlider.value as HTMLCanvasElement;
  canvas.width = props.width;
  canvas.height = props.height;

  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  GradientUtil.setRainbowGradientToCanvas(context);
};

const setCaretPosition = (color: HSV, height: number) => {
  caretStyle.value = {
    top: (1 - color.hue / 360) * height - 2 + 'px',
  }
}

const onColorSelected = (event: MouseEvent) => {
  onMouseMove(event);
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
};

const onMouseMove = (event: MouseEvent) => {
  const canvas = colorSlider.value as HTMLCanvasElement;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  const { top } = canvas.getBoundingClientRect();

  let caretPosition = event.clientY - top;

  if (caretPosition < 0) caretPosition = 0;
  if (caretPosition > props.height) caretPosition = props.height;

  caretStyle.value = {
    top: caretPosition - 2 + 'px',
  }

  const imgData = context.getImageData(0, Math.min(caretPosition, props.height - 1), 1, 1);
  const [r, g, b] = imgData.data;
  emits('color-selected', new RGBA(r, g, b, props.colorOpacity));
};

const onMouseUp = (event: MouseEvent) => {
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
};

</script>

<style lang="scss" scoped>
.color-slider {
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