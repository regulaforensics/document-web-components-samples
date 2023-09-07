import { defineComponents, DocumentReaderService } from '@regulaforensics/vp-frontend-document-components';

window.RegulaDocumentSDK = new DocumentReaderService();

defineComponents().then(() => window.RegulaDocumentSDK.initialize());
// To use the document-reader component on test environments, you have to set the base64 license
// defineComponents().then(() => window.RegulaDocumentSDK.initialize({ license: 'YOUR_BASE64_LICENSE_KEY' }));

const container = document.querySelector('#container');
const component = document.querySelector('document-reader');
const customMessage = document.querySelector('.custom-message');

component.settings = {
    locale: 'custom',
    regulaLogo: false,
    multipageProcessing: true,
    startScreen: true,
    multipleFileInput: true,
    changeCameraButton: true,
    closeButton: false,
    cameraFrameShapeType: 'corners',
    cameraFrameBorderWidth: 7,
};

component.translations = {
    custom: {
        scanIDInBrowser: 'Scan your ID',
    }
};

function readerResponseListener(data) {
    if (data.detail.action !== 'PROCESS_FINISHED') return;
    const status = data.detail.data?.status;
    const isFinishStatus = status === 1 || status === 2;

    if (!isFinishStatus || !data.detail.data?.response) return;
    const componentResponse = data.detail.data.response;
    console.log('Response:', componentResponse);
}

function readerActionListener(data) {
    customMessage.textContent = `Last event: ${data.detail.action}`;

    if (data.detail.action === 'CAMERA_PROCESS_STARTED') {
        customMessage.style.display = 'block';
    }
    if (data.detail.action === 'PROCESS_FINISHED') {
        customMessage.style.display = 'none';
    }
}

container.addEventListener('document-reader', readerResponseListener);
container.addEventListener('document-reader', readerActionListener);
