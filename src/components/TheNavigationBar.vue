<template>
  <nav class="nav-bar">
    <div class="nav-bar__logo title-semi-26">COLOVERTIO</div>
    <div class="nav-bar__list">
      <a
        v-for="(item, index) of NavBarItems"
        :key="index"
        :href="item.url"
        class="nav-bar__item title-regular-18"
      >
        {{ item.name }}
      </a>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { NavBarItems } from "@/consts/nav-bar-items.const";


</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  height: 70px;

  &__logo {

  }

  &__list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__item {
    text-decoration: none;
    color: $dark-title-color;
  }

  &__item:hover {
    color: $light-title-color;
    transition: all .5s;
  }
}
</style>