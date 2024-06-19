<template>
  <div class="container">
    <document-reader
        v-if="isOpen"
        @document-reader="listener"
        ref="component"
    ></document-reader>
    <button v-else @click="isOpen=true">Open component</button>
  </div>
</template>

<script setup lang="ts">
import {
  DocumentReaderWebComponent,
  DocumentReaderDetailType
} from '@regulaforensics/vp-frontend-document-components';

const { $defineComponents, $DocumentReaderService } = useNuxtApp();
const component = ref<DocumentReaderWebComponent>();
const isOpen = ref(false);

const listener = (data: CustomEvent<DocumentReaderDetailType>) => {
  if (data.detail.action === 'PROCESS_FINISHED') {
    const status = data.detail.data?.status;
    const isFinishStatus = status === 1 || status === 2;

    if (!isFinishStatus || !data.detail.data?.response) return;
    console.log(data.detail.data.response);
  }

  if (data.detail?.action === 'CLOSE') {
    isOpen.value = false;
  }
};

onMounted(() => {
  window.RegulaDocumentSDK = new $DocumentReaderService();
  window.RegulaDocumentSDK.recognizerProcessParam = {
    processParam: {
      scenario: 'MrzAndLocate',
      multipageProcessing: true,
    },
  };
  window.RegulaDocumentSDK.imageProcessParam = {
    processParam: {
      scenario: 'MrzAndLocate',
    },
  };

  $defineComponents().then(() => window.RegulaDocumentSDK.initialize());
  // To use the document-reader component on test environments, you have to set the base64 license
  // $defineComponents().then(() => window.RegulaDocumentSDK.initialize({ license: 'YOUR_BASE64_LICENSE_KEY' }));
});

watch(component, () => {
  if (component.value) {
    component.value.settings = {
      startScreen: true,
      changeCameraButton: true,
    };
  }
});
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
