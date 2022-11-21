import { defineComponents } from '@regulaforensics/vp-frontend-document-components';

defineComponents();

const component = document.querySelector('camera-snapshot');

function listener(event) {
    if (event.detail) {
        const response = event.detail; // The response of the component will be located here
        console.log(response); // Doing something with the response
    }
}

component.addEventListener('camera-snapshot', listener);
