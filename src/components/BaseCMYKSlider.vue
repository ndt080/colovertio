<template>
  <div class="slider-box">
    <div class="slider-box__group">
      <div class="slider-box__item">
        <vue3-slider
          v-model="color.cyan"
          class="slider-box__item_slider"
          color="#1919ff"
          track-color="#ebebeb"
          orientation="circular"
          :height="sliderOptions.height"
        />
        <div class="slider-box__item_text">{{color.cyan}}%</div>
      </div>
      <div class="slider-box__item">
        <vue3-slider
          v-model="color.magenta"
          class="slider-box__item_slider"
          color="#ff00ff"
          track-color="#ebebeb"
          orientation="circular"
          :height="sliderOptions.height"
        />
        <div class="slider-box__item_text">{{color.magenta}}%</div>
      </div>
    </div>
    <div class="slider-box__group">
      <div class="slider-box__item">
        <vue3-slider
          v-model="color.yellow"
          class="slider-box__item_slider"
          color="#fefe22"
          track-color="#ebebeb"
          orientation="circular"
          :height="sliderOptions.height"
        />
        <div class="slider-box__item_text">{{color.yellow}}%</div>
      </div>
      <div class="slider-box__item">
        <vue3-slider
          v-model="color.black"
          class="slider-box__item_slider"
          color="#0a0a0a"
          track-color="#ebebeb"
          orientation="circular"
          :height="sliderOptions.height"
        />
        <div class="slider-box__item_text">{{color.black}}%</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import type { CMYK } from "@/models";

const sliderOptions = ref({
  height: 10,
});

const props = defineProps<{ color: CMYK }>();
const cyan = computed(() => props.color.cyan);
const magenta = computed(() => props.color.magenta);
const yellow = computed(() => props.color.yellow);
const black = computed(() => props.color.black);
const emits = defineEmits(['color-changed']);

watch([cyan, magenta, yellow, black], () => {
  emits('color-changed', props.color);
});
</script>

<style lang="scss" scoped>
.slider-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__item {
    position: relative;
    width: 90px;
    height: 90px;
    margin-right: 20px;
    margin-bottom: 20px;

    &_slider {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 20;
    }

    &_text {
      position: absolute;
      top: calc(50% - 7px);
      right: 0;
      bottom: 0;
      left: 0;
      text-align: center;
      z-index: 1;
    }
  }
}
</style>