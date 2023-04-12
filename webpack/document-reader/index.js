import {defineComponents, DocumentReaderService} from '@regulaforensics/vp-frontend-document-components';

const container = document.querySelector('#container');
const button = document.querySelector('#button');

window.RegulaDocumentSDK = new DocumentReaderService();

defineComponents().then(async () => {
    await window.RegulaDocumentSDK.prepare();
});

function createDocumentReader() {
    const documentReaderElement = document.createElement('document-reader');

    documentReaderElement.setAttribute('start-screen', 'true');
    documentReaderElement.setAttribute('license', 'YOUR_BASE64_KEY'); // Set only for development!

    return documentReaderElement;
}

function documentReaderListener(data) {
    if (data.detail.action === 'PROCESS_FINISHED') {
        const status = data.detail.data?.status;
        const isFinishStatus = status === 1 || status === 2;

        if (isFinishStatus && data.detail.data?.response) {
            console.log(data.detail.data.response);
        }
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
