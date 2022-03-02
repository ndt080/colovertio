<template>
  <div class="layout">
    <the-navigation-bar></the-navigation-bar>

    <main class="layout__body">
      <RouterView />
    </main>
    <div class="layout__footer title-regular-14">
      <p>Copyright ©2022 All rights reserved </p>
      <p>Developed by Andrei Petrov</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import TheNavigationBar from "@/components/TheNavigationBar.vue";
</script>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;

  &__body {
    margin: 0 20px !important;
    border: 0.5px solid rgba(0,0,0, 0.05);
    border-radius: 30px;
    //box-shadow: 0 -8px 5px -5px rgba(0,0,0, 0.05);
    overflow: hidden;
  }

  &__footer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    min-height: 50px;
    padding: 10px 50px;
  }
}
</style>
