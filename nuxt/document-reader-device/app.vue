<template>
  <div class="container">
    <document-reader-device
        v-if="isOpen"
        @document-reader-device="listener"
        ref="component"
    ></document-reader-device>
    <button v-else @click="isOpen=true">Open component</button>
  </div>
</template>

<script setup lang="ts">
import {
  DocumentReaderDeviceWebComponent,
  DocumentReaderDetailType
} from '@regulaforensics/vp-frontend-document-components-beta';

const { $defineComponents } = useNuxtApp();
const component = ref<DocumentReaderDeviceWebComponent>();
const isOpen = ref(false);

const listener = (data: CustomEvent<DocumentReaderDetailType>) => {
  if (data.detail.action === 'PROCESS_FINISHED') {
    const status = data.detail.data?.status;
    const isFinishStatus = status === 1;

    if (!isFinishStatus || !data.detail.data?.response) return;
    console.log(data.detail.data.response);
  }

  if (data.detail?.action === 'CLOSE') {
    isOpen.value = false;
  }
};

onMounted(() => {
  $defineComponents();
});

watch(component, () => {
  if (component.value) {
    component.value.settings = {
      serviceUrl: 'SERVICE_URL',
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
