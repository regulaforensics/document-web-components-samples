<template>
  <div class="container">
    <document-reader start-screen></document-reader>
  </div>
</template>

<script setup lang="ts">
const { $defineComponents, $DocumentReaderService } = useNuxtApp();

onMounted(() => {
  window.RegulaDocumentSDK = new $DocumentReaderService();

  $defineComponents().then(() => window.RegulaDocumentSDK.initialize());
  // To use the document-reader component on test environments, you have to set the base64 license
  // $defineComponents().then(() => window.RegulaDocumentSDK.initialize({ license: 'YOUR_BASE64_LICENSE_KEY' }));
});
</script>

<style>
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
