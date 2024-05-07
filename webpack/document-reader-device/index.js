import { defineComponents } from '@regulaforensics/vp-frontend-document-components';

const container = document.querySelector('#container');
const button = document.querySelector('#button');

defineComponents();

function createDocumentReaderDevice() {
    const documentReaderDeviceElement = document.createElement('document-reader-device');

    documentReaderDeviceElement.settings = {
        serviceUrl: 'SERVICE_URL',
    }

    return documentReaderDeviceElement;
}

function documentReaderDeviceListener(data) {
    if (data.detail.action === 'PROCESS_FINISHED') {
        const status = data.detail.data?.status;
        const isFinishStatus = status === 1;

        if (!isFinishStatus || !data.detail.data?.response) return;
        console.log(data.detail.data.response);
    }
    if (data.detail?.action === 'CLOSE') {
        const reader = document.querySelector('document-reader-device');

        if (reader) {
            reader.remove();
        }

        button.style.display = 'block';
    }
}

function buttonListener(event) {
    container.append(createDocumentReaderDevice());
    event.target.style.display = 'none';
}

container.addEventListener('document-reader-device', documentReaderDeviceListener);
button.addEventListener('click', buttonListener);
