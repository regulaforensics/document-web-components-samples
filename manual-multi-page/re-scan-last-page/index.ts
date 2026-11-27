import {
    defineComponents,
    DocumentReaderService,
    InternalScenarios,
    DocumentReaderWebComponent,
    DocumentReaderDetailType,
    TransactionEvent,
    EventActions,
    ResponseCode,
} from '@regulaforensics/vp-frontend-document-components';
import './styles.css';

const newDocumentButton = document.querySelector('#new-document') as HTMLButtonElement;
const nextPageButton = document.querySelector('#new-page') as HTMLButtonElement;
const reScanLastPageButton = document.querySelector('#re-scan-last-page') as HTMLButtonElement;
const info = document.querySelector('.info') as HTMLDivElement;

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
// defineComponents().then(() => window.RegulaDocumentSDK.initialize({ license: 'YOUR_BASE64_LICENSE_KEY' }));

function createDocumentReader() {
    const documentReaderElement = document.createElement('document-reader') as DocumentReaderWebComponent;
    const container = document.createElement('div');
    documentReaderElement.setAttribute('new-layout', 'true');
    container.setAttribute('class', 'reader-container');
    container.append(documentReaderElement);

    documentReaderElement.settings = {
        uploadFileButton: false,
        manualMultipageMode: true,
    }

    return container;
}

function documentReaderListener(data: CustomEvent<DocumentReaderDetailType | TransactionEvent>) {
    const reader = document.querySelector('.reader-container');
    const action = data.detail.action;

    if (action === EventActions.PROCESS_FINISHED) {
        const status = data.detail.data?.status;
        const isFinishStatus = status === ResponseCode.OK || status === ResponseCode.TIMEOUT;
        const responseData = data.detail.data;

        if (isFinishStatus && responseData?.response) {
            const isMorePagesAvailable = !!responseData.response.rawResponse.morePagesAvailable;

            info.textContent = 'Check your result in the console. ';

            if (isMorePagesAvailable) {
                nextPageButton.disabled = false;
                info.textContent += 'More pages are available, click "Start new page" ' +
                    'to continue scanning, or start scanning a new document by clicking "Start new document".';
            } else {
                reScanLastPageButton.disabled = false;
                info.textContent += 'You can reset the scan results of the last page by clicking on the "Re-scan last page" button.';
            }
            console.log(responseData.response);

            reader?.remove();
        }
    }
    if (action === EventActions.CAMERA_PROCESS_CLOSED) reader?.remove();
}

function newDocumentButtonListener() {
    if (!window.RegulaDocumentSDK) return;

    info.textContent = '';
    nextPageButton.disabled = true;
    reScanLastPageButton.disabled = true;
    void window.RegulaDocumentSDK.startNewDocument();
    document.body.append(createDocumentReader());
}

function nextPageButtonListener() {
    if (!window.RegulaDocumentSDK) return;

    info.textContent = '';
    nextPageButton.disabled = true;
    void window.RegulaDocumentSDK.startNewPage();
    document.body.append(createDocumentReader());
}

function reScanLastPageListener() {
    if (!window.RegulaDocumentSDK) return;

    info.textContent = '';
    reScanLastPageButton.disabled = true;
    void window.RegulaDocumentSDK.clearLastPage();
    document.body.append(createDocumentReader());
}

newDocumentButton?.addEventListener('click', newDocumentButtonListener);
nextPageButton?.addEventListener('click', nextPageButtonListener);
reScanLastPageButton?.addEventListener('click', reScanLastPageListener);
document.body.addEventListener('document-reader', documentReaderListener);
