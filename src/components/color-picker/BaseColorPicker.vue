<template>
  <div class="color-picker">
    <v-saturation-palette
      :color="color"
      @saturation-selected="onColorSelected($event)"
      style="margin-right: 10px !important"
    />
    <v-color-slider
      :hsvColor="hsvColor"
      :colorOpacity="color?.opacity"
      @color-selected="onColorSelected($event)"
      style="margin-right: 10px !important"
    />
    <v-alpha-slider
      :color="color"
      @alpha-selected="onColorSelected($event)"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, ref, watch } from "vue";
import VColorSlider from "./components/VColorSlider.vue";
import VAlphaSlider from "@/components/color-picker/components/VAlphaSlider.vue";
import VSaturationPalette from "@/components/color-picker/components/VSaturationPalette.vue";
import type { RGBA } from "@/models/rgba.model";
import type { HSV } from "@/models/hsv.model";
import { DefaultColorOptions } from "./consts/default-color-options.const";
import { ColorConverter } from "@/utils/color-converter.util";


const props = defineProps<{ color: RGBA }>();
const emits = defineEmits(['color-selected']);
const hsvColor = computed(() => ColorConverter.convertRGBtoHSV(props.color));

function onColorSelected(color: RGBA) {
  emits('color-selected', color);
}
</script>

<style lang="scss" scoped>
.color-picker {
  display: flex;
  flex-direction: row;
  height: 100%;
}
</style>