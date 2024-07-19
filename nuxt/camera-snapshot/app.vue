<template>
  <div class="container">
    <ClientOnly>
      <CameraSnapshot />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import CameraSnapshot from '@/components/camera-snapshot.vue';
</script>

<style>
.container {
  display: flex;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
}

button {
  padding: 10px 30px;
  color: white;
  font-size: 16px;
  border-radius: 2px;
  background-color: #bd7dff;
  border: 1px solid #bd7dff;
  cursor: pointer;
}
</style>
