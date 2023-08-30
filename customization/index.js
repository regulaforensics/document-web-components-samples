import { defineComponents, DocumentReaderService } from '@regulaforensics/vp-frontend-document-components';

window.RegulaDocumentSDK = new DocumentReaderService();

defineComponents().then(() => window.RegulaDocumentSDK.prepare());

const container = document.querySelector('#container');
const component = document.querySelector('document-reader');
const customMessage = document.querySelector('.custom-message');

component.settings = {
    locale: 'custom',
    regulaLogo: false,
    devLicense: 'YOUR_BASE64_LICENSE', // Set only for development!
    multipageProcessing: true,
    startScreen: true,
    multipleFileInput: true,
    changeCameraButton: true,
    closeButton: false,
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
