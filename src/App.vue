<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <section class="body-view">
    <RouterView />
  </section>
</template>

<style>
.body-view {
  margin: 0 15px 30px 15px;
}

@media (min-width: 640px) {
  .body-view {
    margin: 0 30px 30px 30px;
  }
}
</style>