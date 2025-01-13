const { DocumentReaderProcessor } = window.RegulaDocumentWebComponent;
const video = document.getElementById('video');
const status = document.getElementById('status');
const service = new DocumentReaderProcessor(video);

service.recognizerProcessParam = {
    processParam: {
        scenario: 'MrzAndLocate',
        multipageProcessing: true,
    },
};
service.imageProcessParam = {
    processParam: {
        scenario: 'MrzAndLocate',
    },
};

async function pageListener(currentPage) { // Listener for multi-page documents
    status.textContent = 'Flip the document';

    setTimeout(async () => {
        status.textContent = 'In process.';
        await currentPage.startNextPage();
    }, 3000);
}

async function start() {
    try {
        status.textContent = 'Initializing...';
        await service.initialize({ license: 'YOUR_BASE64_KEY' }); // For development
        // await service.initialize(); // For production

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
