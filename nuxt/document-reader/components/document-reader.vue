<template>
  <document-reader
      v-if="isOpen"
      @document-reader="listener"
      ref="component"
  ></document-reader>
  <button v-else @click="isOpen=true">Open component</button>
</template>

<script setup lang="ts">
import {
  EventActions,
  defineComponents,
  DocumentReaderService,
  InternalScenarios,
  type DocumentReaderWebComponent,
  type DocumentReaderDetailType
} from '@regulaforensics/vp-frontend-document-components';

const component = ref<DocumentReaderWebComponent>();
const isOpen = ref(false);

const listener = (data: CustomEvent<DocumentReaderDetailType>) => {
  if (data.detail.action === EventActions.PROCESS_FINISHED) {
    const status = data.detail.data?.status;
    const isFinishStatus = status === 1 || status === 2;

    if (!isFinishStatus || !data.detail.data?.response) return;
    console.log(data.detail.data.response);
  }

  if (data.detail?.action === EventActions.CLOSE) {
    isOpen.value = false;
  }
};

onMounted(async () => {
  window.RegulaDocumentSDK = new DocumentReaderService();
  window.RegulaDocumentSDK.recognizerProcessParam = {
    processParam: {
      scenario: InternalScenarios.MrzAndLocate,
      multipageProcessing: true,
    },
  };
  window.RegulaDocumentSDK.imageProcessParam = {
    processParam: {
      scenario: InternalScenarios.MrzAndLocate,
    },
  };

  defineComponents().then(() => window.RegulaDocumentSDK.initialize());
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
