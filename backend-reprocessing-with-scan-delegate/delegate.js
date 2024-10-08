import {defineComponents, DocumentReaderService} from '@regulaforensics/vp-frontend-document-components';

const container = document.querySelector('#container');
const button = document.querySelector('#button');

const YOUR_SERVICE_URL = SERVICE;

window.RegulaDocumentSDK = new DocumentReaderService();

window.RegulaDocumentSDK.recognizerProcessParam = {
    processParam: {
        scenario: 'MrzAndLocate',
        backendProcessing: {
            serviceURL: YOUR_SERVICE_URL,
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
defineComponents().then(() => window.RegulaDocumentSDK.initialize({license: LICENSE}));
// To use the document-reader component on test environments, you have to set the base64 license
// defineComponents().then(() => window.RegulaDocumentSDK.initialize({ license: 'YOUR_BASE64_LICENSE_KEY' }));

function createDocumentReader() {
    const documentReaderElement = document.createElement('document-reader');

    documentReaderElement.settings = {
        startScreen: false, // camera usage assumed for delegate
        changeCameraButton: true,
    };

    return documentReaderElement;
}

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

function buttonListener(event) {
    container.append(createDocumentReader());
    event.target.style.display = 'none';
}

container.addEventListener('document-reader', documentReaderListener);
button.addEventListener('click', buttonListener);
