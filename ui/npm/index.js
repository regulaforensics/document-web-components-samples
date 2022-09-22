import { defineComponents, DocumentReaderService } from '@regulaforensics/vp-frontend-document-components';

window.RegulaDocumentSDK = new DocumentReaderService();

defineComponents()
    .then(() => window.RegulaDocumentSDK.prepare())

const component = document.getElementsByTagName('document-reader')[0];

function listener(event) {
    if (event.detail) {
        const response = event.detail; // The response of the component will be located here
        console.log(response); // Doing something with the response
    }
}

// Adding an event listener to our component
component.addEventListener('document-reader', listener);
