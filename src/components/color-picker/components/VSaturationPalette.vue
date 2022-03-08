<template>
  <div class="saturation-palette" @mousedown.prevent.stop="onColorSelected">
    <canvas class="saturation-palette__palette" ref="saturationPalette" />
    <div :style="caretStyle" class="saturation-palette__caret" />
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, onMounted, ref, watch } from "vue";
import { GradientUtil } from "../utils/gradient.util";
import { RGBA } from "@/models/rgba.model";
import type { HSV } from "@/models/hsv.model";
import { DefaultColorOptions } from "../consts/default-color-options.const";
import { ColorConverter } from "@/utils/color-converter.util";

interface VColorPaletteProps {
  color: RGBA,
  size?: number,
}

const props = withDefaults(defineProps<VColorPaletteProps>(), { size: 200 });
const emits = defineEmits(['saturation-selected']);

const saturationPalette = ref<HTMLCanvasElement>();
const caretStyle = ref();

const color = computed(() => props.color);

onMounted(() => {
  drawColorPalette();
  setCaretPosition(ColorConverter.convertRGBtoHSV(props.color), props.size);
});

watch(color, () => drawColorPalette());


const drawColorPalette = () => {
  const canvas = saturationPalette.value as HTMLCanvasElement;
  canvas.width = props.size;
  canvas.height = props.size;

  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  GradientUtil.setSaturationGradientToCanvas(context, props.color);
};

const setCaretPosition = (color: HSV, size: number) => {
  caretStyle.value = {
    left: color.saturation * size - 5 + 'px',
    top: (1 - color.value) * size - 5 + 'px',
  }
}

const onColorSelected = (event: MouseEvent) => {
  onMouseMove(event);
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
};

const onMouseMove = (event: MouseEvent) => {
  const canvas = saturationPalette.value as HTMLCanvasElement;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  const { top, left } = canvas.getBoundingClientRect();

  let caretPositionX = event.clientX - left;
  let caretPositionY = event.clientY - top;

  if (caretPositionX < 0) caretPositionX = 0;
  if (caretPositionY < 0) caretPositionY = 0;

  if (caretPositionX > props.size) caretPositionX = props.size;
  if (caretPositionY > props.size) caretPositionY = props.size;

  caretStyle.value = {
    left: caretPositionX - 5 + 'px',
    top: caretPositionY - 5 + 'px',
  }

  const imgData = context.getImageData(
    Math.min(caretPositionX, props.size - 1),
    Math.min(caretPositionY, props.size - 1),
    1,
    1
  );

  const [r, g, b] = imgData.data;
  emits('saturation-selected', new RGBA(r, g, b, props.color.opacity));
};

const onMouseUp = (event: MouseEvent) => {
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
};

</script>

<style lang="scss" scoped>
.saturation-palette {
  position: relative;
  cursor: pointer;
  overflow: hidden;

  &__palette {
    border-radius: 5px;
  }

  &__caret {
    position: absolute;
    left: 100px;
    top: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.3);
    pointer-events: none;
  }
}
</style>