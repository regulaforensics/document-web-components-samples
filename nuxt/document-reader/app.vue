<template>
  <div class="container">
    <document-reader start-screen></document-reader>
  </div>
</template>

<script setup lang="ts">
const { $defineComponents, $DocumentReaderService } = useNuxtApp()

onMounted(() => {
  window.RegulaDocumentSDK = new $DocumentReaderService();

  $defineComponents().then(async () => {
    await window.RegulaDocumentSDK.prepare();
  });
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
