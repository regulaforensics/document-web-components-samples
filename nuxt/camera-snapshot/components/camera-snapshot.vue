<template>
  <camera-snapshot
      start-screen
      v-if="isOpen"
      @camera-snapshot="listener"
      ref="component"
  ></camera-snapshot>
  <button v-else @click="isOpen=true">Open component</button>
</template>

<script setup lang="ts">
import {
  EventActions,
  defineComponents,
  type DocumentReaderCaptureWebComponent,
  type CameraSnapshotDetailType,
} from '@regulaforensics/vp-frontend-document-components';

const component = ref<DocumentReaderCaptureWebComponent>();
const isOpen = ref(false);

const listener = (data: CustomEvent<CameraSnapshotDetailType>) => {
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
      changeCameraButton: true,
    };
  }
});
</script>
