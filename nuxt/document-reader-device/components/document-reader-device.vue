<template>
  <document-reader-device
      v-if="isOpen"
      @document-reader-device="listener"
      ref="component"
  ></document-reader-device>
  <button v-else @click="isOpen=true">Open component</button>
</template>

<script setup lang="ts">
import {
  EventActions,
  defineComponents,
  type DocumentReaderDeviceWebComponent,
  type DocumentReaderDetailType
} from '@regulaforensics/vp-frontend-document-components';

const component = ref<DocumentReaderDeviceWebComponent>();
const isOpen = ref(false);

const listener = (data: CustomEvent<DocumentReaderDetailType>) => {
  if (data.detail.action === EventActions.PROCESS_FINISHED) {
    const status = data.detail.data?.status;
    const isFinishStatus = status === 1;

    if (!isFinishStatus || !data.detail.data?.response) return;
    console.log(data.detail.data.response);
  }

  if (data.detail?.action === EventActions.CLOSE) {
    isOpen.value = false;
  }
};

onMounted(() => {
  defineComponents();
});

watch(component, () => {
  if (component.value) {
    component.value.settings = {
      serviceUrl: 'SERVICE_URL',
    };
  }
});
</script>
