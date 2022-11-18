import { DocumentReaderProcessor } from './node_modules/@regulaforensics/vp-frontend-document-components/esm/main.js';

const video = document.getElementById('video');
const status = document.getElementById('status');
const service = new DocumentReaderProcessor(video);

async function pageListener(currentPage) { // Listener for multi-page documents
    status.textContent = 'Flip the document';

    setTimeout(async () => {
        status.textContent = 'In process.';
        await currentPage.startNextPage();
    }, 3000);
}

async function start() {
    try {
        status.textContent = 'Loading data...';
        await service.prepare(); // Download wasm and data files
        status.textContent = 'Initializing...';
        await service.initialize({license: 'LICENSE_KEY'}); // Set license key and initialize service

        status.textContent = 'In process.';
        const result = await service.startRecognition(pageListener); // Start recognition and get results

        status.textContent = 'Done! See the result in the console.';
        service.stopRecognition();

        console.log(result);
    } catch (e) {
        console.log(e);
    }
}

start();
