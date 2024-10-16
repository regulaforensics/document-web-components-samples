import {defineComponents, DocumentReaderService} from '@regulaforensics/vp-frontend-document-components';

const container = document.querySelector('#container');
const documentReaderElement = document.querySelector('document-reader');

window.RegulaDocumentSDK = new DocumentReaderService();

window.RegulaDocumentSDK.recognizerProcessParam = {
    processParam: {
        scenario: 'MrzAndLocate',
        backendProcessing: {
            serviceURL: import.meta.env.VITE_SERVICE,
            httpHeaders: {  // you can set http headers if necessary
                key1: 'header1',
                key2: 'header2',
                key3: 'header3'
            }
        }
    },
    tag: new URL(window.location.href).searchParams.get('tag') // assume session Id tag was added to URL params
};
window.RegulaDocumentSDK.imageProcessParam = {
    processParam: {
        scenario: 'MrzAndLocate',
    },
};
defineComponents().then(() => window.RegulaDocumentSDK.initialize({license: import.meta.env.VITE_LICENSE}));
// To use the document-reader component on test environments, you have to set the base64 license
// defineComponents().then(() => window.RegulaDocumentSDK.initialize({ license: 'YOUR_BASE64_LICENSE_KEY' }));

documentReaderElement.settings = {
    mobileDelegate: true, // change finish screen
    changeCameraButton: true,
};

function documentReaderListener(data) {
    if (data.detail.action === 'PROCESS_FINISHED') {
        const status = data.detail.data?.status;
        const isFinishStatus = status === 1 || status === 2;

        if (!isFinishStatus || !data.detail.data?.response) return;

        window.RegulaDocumentSDK.finalizePackage();
    }
    if (data.detail?.action === 'CLOSE') {
        const reader = document.querySelector('document-reader');

        if (reader) {
            reader.remove();
        }

        button.style.display = 'block';
    }
}

container.addEventListener('document-reader', documentReaderListener);
