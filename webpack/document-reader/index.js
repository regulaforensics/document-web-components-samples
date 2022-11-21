import { defineComponents, DocumentReaderService } from '@regulaforensics/vp-frontend-document-components';

window.RegulaDocumentSDK = new DocumentReaderService();

defineComponents().then(async () => {
    await window.RegulaDocumentSDK.prepare();
});

const component = document.querySelector('document-reader');

function listener(event) {
    if (event.detail) {
        const response = event.detail; // The response of the component will be located here
        console.log(response); // Doing something with the response
    }
}

component.addEventListener('document-reader', listener);
