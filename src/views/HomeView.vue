<template>
  <div class="page" :style="{ backgroundColor: color.RGBA?.toRGBAString() }">
    <div class="toolbar">
      <div class="toolbar__group">
        <div class="toolbar__color_picker">
          <BaseColorPicker :color="selectedColor" @color-selected="onColorSelected"/>
        </div>
        <div class="toolbar__input">
          <BaseInput
            placeholder="RGBA"
            :value="rgbaInput"
            @update:value="setRGBAInputValue"
          />
        </div>
      </div>
      <div class="toolbar__group">
        <div class="toolbar__input">
          <BaseInput
            placeholder="HEX"
            :value="hexInput"
            @update:value="setHEXInputValue"
          />
        </div>
        <div class="toolbar__input">
          <BaseInput
            placeholder="HSV"
            :value="hsvInput"
            @update:value="setHSVInputValue"
          />
        </div>
        <div class="toolbar__input">
          <BaseInput
            placeholder="HLS"
            :value="hlsInput"
            @update:value="setHLSInputValue"
          />
        </div>
        <div class="toolbar__input">
          <BaseInput
            placeholder="XYZ"
            :value="xyzInput"
            @update:value="setXYZInputValue"
          />
        </div>
      </div>
      <div class="toolbar__group">
        <BaseCMYKSlider :color="cmykValue" @color-changed="setCMYKSliderValue" />
        <div class="toolbar__input">
          <BaseInput
            placeholder="CMYK"
            :value="cmykInput"
            @update:value="setCMYKInputValue"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<!--CMYK ↔ HLS ↔ Xyz Model-->
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import VInput from "@/components/BaseInput.vue";
import { RGBA } from "@/models/rgba.model";
import { Color } from "@/models/color.model";
import { VColorPicker } from "@/components";
import { DefaultColorOptions } from "@/components/color-picker/consts/default-color-options.const";
import VCmykSlider from "@/components/BaseCMYKSlider.vue";
import { CMYK, HEX, HLS, HSV, XYZ } from "@/models";
import BaseCMYKSlider from "@/components/BaseCMYKSlider.vue";
import BaseColorPicker from "@/components/color-picker/BaseColorPicker.vue";
import BaseInput from "@/components/BaseInput.vue";

const defaultColor = new Color();
defaultColor.createFromRGBA(DefaultColorOptions.rgbaColor);

const color = ref(defaultColor);
const selectedColor = ref<RGBA>(defaultColor.RGBA!);

const rgbaInput = ref(defaultColor.RGBA?.toString());
const hlsInput = ref(defaultColor.HLS?.toString());
const hsvInput = ref(defaultColor.HSV?.toString());
const hexInput = ref(defaultColor.HEX?.toString());
const xyzInput = ref(defaultColor.XYZ?.toString());
const cmykInput = ref(defaultColor.CMYK?.toString());

const cmykValue = computed((): CMYK => color.value.CMYK || new CMYK(0,0,0,0));
const rgbaValue = computed((): RGBA => color.value.RGBA || new RGBA(0,0,0,1));

watch(rgbaValue, (value) => {
  selectedColor.value = value;
  rgbaInput.value = color.value.RGBA?.toString();
  hlsInput.value = color.value.HLS?.toString();
  hsvInput.value = color.value.HSV?.toString();
  hexInput.value = color.value.HEX?.toString();
  xyzInput.value = color.value.XYZ?.toString();
  cmykInput.value = color.value.CMYK?.toString();
});

const setRGBAInputValue = (value: string) => color.value.createFromRGBA(RGBA.stringToRGBA(value));
const setHLSInputValue = (value: string) => color.value.createFromHLS(HLS.stringToHLS(value));
const setHEXInputValue = (value: string) => color.value.createFromHEX(HEX.stringToHEX(value));
const setXYZInputValue = (value: string) => color.value.createFromXYZ(XYZ.stringToXYZ(value));
const setHSVInputValue = (value: string) => color.value.createFromHSV(HSV.stringToHSV(value));
const setCMYKInputValue = (value: string) => color.value.createFromCMYK(CMYK.stringToCMYK(value));
const setCMYKSliderValue = (value: CMYK) => color.value.createFromCMYK(value);
const onColorSelected = (value: RGBA) => color.value.createFromRGBA(value);
</script>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 30px;
  min-height: 200px;
  height: 100%;
}

.toolbar {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border: 0.5px solid rgba(0, 0, 0, 0.05);
  border-radius: 30px;
  min-width: 50%;
  min-height: 80%;

  &__group {
    padding: 30px;
  }

  &__color_picker {
    margin-bottom: 10px;
  }

  &__input {
    margin-bottom: 10px !important;
  }
}

@media screen and (max-width: 700px) {
  .toolbar {
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-wrap: no-wrap;
    padding: 15px 0;

    &__group {
      width: 100%;
      padding: 0 15px;
    }
  }
}
</style>


