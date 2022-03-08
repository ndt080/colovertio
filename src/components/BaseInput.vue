<template>
  <div class="v-input" :class="styleClass">
    <transition name="fade">
      <div v-if="isValue" class="v-input__label title-regular-14">{{props.placeholder}}</div>
    </transition>
    <input
      ref="input"
      class="v-input__input"
      :style="props.style"
      :type="props.type"
      :placeholder="props.placeholder"
      :autocomplete="props.autocomplete"
      @blur="updateValue"
      v-model="inputValue"
    />
    <i class="v-input__icon icon-success fas fa-check"></i>
    <i class="v-input__icon icon-error fas fa-exclamation"></i>
  </div>
  <div class="v-input__error title-regular-12" v-if="props.isError && props.errorMessage">
    {{ props.errorMessage }}
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, defineEmits, ref, watch, computed, onMounted } from "vue";

interface BaseInputProps {
  type?: string,
  autocomplete?: string,
  placeholder?: string,
  mask?: string,
  style?: { [key: string]: string | number },
  value?: string,
  isSuccess?: boolean,
  isError?: boolean,
  errorMessage?: string,
}

const props = withDefaults(defineProps<BaseInputProps>(), {
  type: "text",
  mask: "",
  autocomplete: "on",
  placeholder: "Enter value...",
  isSuccess: false,
  isError: false,
  errorMessage: ""
});

const emits = defineEmits(['update:value'])

const inputValue = ref(props.value || '');
const input = ref<HTMLElement>();
const isValue = ref(!!props.value);
const value = computed((): string => props.value || "");
const styleClass = computed(() => ({
  "v-input--error": props.isError,
  "v-input--success": props.isSuccess && !props.isError
}));

onMounted(() => {
  input.value?.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode === 13) updateValue();
  });
});

watch(value, (currentValue: string) => {
  inputValue.value = currentValue;
});

function updateValue() {
  isValue.value = !!inputValue.value;
  emits("update:value", inputValue.value);
}
</script>

<style lang="scss" scoped>
.v-input {
  position: relative;

  &__label {
    margin-left: 5px;
    margin-bottom: 5px;
  }

  &__input {
    box-sizing: border-box;
    width: 100%;
    background: $input-background-color;
    padding: 10px;
    border: none;
    -webkit-border-radius: $second-border-radius;
    -moz-border-radius: $second-border-radius;
    border-radius: $second-border-radius;
    color: $light-title-color;
  }

  &__input:focus {
    outline: 2px solid var(--message-background-color);
    -moz-outline-radius: $second-border-radius;
  }

  &__icon {
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    display: none;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 100%;
    font-size: 15px;
  }

  &__error {
    margin-top: 10px;
    color: $danger-color;
  }

  &__input:-webkit-autofill,
  &__input:-webkit-autofill:hover,
  &__input:-webkit-autofill:focus {
    -webkit-text-fill-color: $light-title-color;
    -webkit-box-shadow: none;
    transition: background-color 5000s ease-in-out 0s;
  }
}

.v-input.v-input--success {
  .v-input__input {
    padding-right: 35px;
    color: $success-color;
    outline: 2px solid $success-color;
  }

  .v-input__icon.icon-success{
    display: flex;
    color: $success-color;
  }
}

.v-input.v-input--error {
  .v-input__input {
    padding-right: 35px;
    color: $danger-color;
    outline: 2px solid $danger-color;
  }

  .v-input__icon.icon-error{
    display: flex;
    right: 15px;
    color: $danger-color;
  }
}

.fade-enter-active,
.fade-leave-active {
  max-height: 20px;
  transition: opacity 0.5s ease, max-height 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>