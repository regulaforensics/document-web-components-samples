import { defineComponents, DocumentReaderService } from '@regulaforensics/vp-frontend-document-components';

const container = document.querySelector('#container');
const button = document.querySelector('#button');

window.RegulaDocumentSDK = new DocumentReaderService();

defineComponents().then(() => window.RegulaDocumentSDK.prepare());

function createDocumentReader() {
    const documentReaderElement = document.createElement('document-reader');

    documentReaderElement.settings = {
        startScreen: true,
        changeCameraButton: true,
        devLicense: 'YOUR_BASE64_LICENSE', // Set only for development!
    }

    return documentReaderElement;
}

function documentReaderListener(data) {
    if (data.detail.action === 'PROCESS_FINISHED') {
        const status = data.detail.data?.status;
        const isFinishStatus = status === 1 || status === 2;

        if (!isFinishStatus || !data.detail.data?.response) return;
        console.log(data.detail.data.response);
    }
    if (data.detail?.action === 'CLOSE') {
        const reader = document.querySelector('document-reader');

        if (reader) {
            reader.remove();
        }

        button.style.display = 'block';
    }
}

function buttonListener(event) {
    container.append(createDocumentReader());
    event.target.style.display = 'none';
}

container.addEventListener('document-reader', documentReaderListener);
button.addEventListener('click', buttonListener);
