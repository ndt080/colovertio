import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import Vue3Slider from "vue3-slider";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Vue3Slider);

app.mount('#app');
