import {defineComponents, DocumentReaderService} from '@regulaforensics/vp-frontend-document-components';
import {DocumentReaderApi} from '@regulaforensics/document-reader-webclient';

const container = document.querySelector('#container');
const button = document.querySelector('#button');

const YOUR_SERVICE_URL = 'https://test.regula.local'
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
    delegateURL: `${window.location.href}delegatePage.html?tag={tag}`, // component will insert current session tag in place of {tag} substring
    tag: Date.now() // session id, will be used to recognize remote transactions
};
window.RegulaDocumentSDK.imageProcessParam = {
    processParam: {
        scenario: 'MrzAndLocate',
    },
};
const api = new DocumentReaderApi({
    basePath: YOUR_SERVICE_URL,
    baseOptions: {
        headers: window.RegulaDocumentSDK.recognizerProcessParam.httpHeaders
    }
});
defineComponents().then(() => window.RegulaDocumentSDK.initialize({license: LICENSE }));
// To use the document-reader component on test environments, you have to set the base64 license
// defineComponents().then(() => window.RegulaDocumentSDK.initialize({ license: 'YOUR_BASE64_LICENSE_KEY' }));

function createDocumentReader() {
    const documentReaderElement = document.createElement('document-reader');

    documentReaderElement.settings = {
        startScreen: true,
        changeCameraButton: true,
    };

    return documentReaderElement;
}

async function documentReaderListener(data) {
    if (data.detail.action === 'REMOTE_TRANSACTION_UPLOADED') {
        // transaction data was uploaded
        const transaction = data.detail.data;
        // if you want to reprocess remote data, trigger reprocessing manually
        try {
            await api.reprocessTransaction(transaction.id, {
                processParam: {
                    scenario: 'FullProcess',
                },
            });
        } catch (e) {
            console.error(e);
        }
    }
    if (data.detail.action === 'REMOTE_PROCESS_FINISHED') {
        // remote transaction was reprocessed, you may find the results in event details
        console.log(data.detail.data?.response)
        alert('Success!')
    }
    if (data.detail.action === 'PROCESS_FINISHED') {
        // in case if user did not choose to use remote device
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
