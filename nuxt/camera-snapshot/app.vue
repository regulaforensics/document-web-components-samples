<template>
  <div class="container">
    <camera-snapshot start-screen></camera-snapshot>
  </div>
</template>

<script setup lang="ts">
const { $defineComponents } = useNuxtApp()

onMounted(() => {
  $defineComponents();
})</script>

<style>
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
