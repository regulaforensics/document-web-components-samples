import { DocumentReaderController } from '@regulaforensics/vp-frontend-document-device';

const service = new DocumentReaderController('SERVICE_URL')

const connectButton = document.getElementById('connect');
const disconnectButton = document.getElementById('disconnect');
const processButton = document.getElementById('process');
const status = document.getElementById('status');

const responseListener = async () => {
    const response = await service.getLastResults();

    processButton.removeAttribute('disabled');
    status.textContent = 'You can see the result in the console';

    console.log(response);
};

const toggleButtons = (connected) => {
    connectButton.disabled = connected;
    disconnectButton.disabled = !connected;
    processButton.disabled = !connected;
    status.textContent = connected ? 'Service connected' : 'Service disconnected';
};

const connectButtonHandler = async () => {
    status.textContent = 'Connecting...';

    await service.initRegulaReader();
    service.hubProxy?.on('OnProcessingFinished', responseListener);

    // If you have multiple RFID readers, you can choose the one you need, just specify its index.
    // await service.setPropertyValue('ActiveRFIDDeviceIdx', 0);
    await service.setPropertyValue('AutoScan', 'false');

    toggleButtons(true);
};

const disconnectButtonHandler = () => {
    service.stop();
    service.hubProxy?.off('OnProcessingFinished', responseListener);

    toggleButtons(false);
};

const processButtonHandler = async () => {
    await service.clearResults();
    // The MRZ of the document must be installed to read the RFID data. Replace DOCUMENT_MRZ with the real MRZ string.
    await service.setPropertyValue('RFIDMRZ', 'DOCUMENT_MRZ');
    await service.waitAndReadRFID();

    processButton.disabled = true;
    status.textContent = 'Processing...';
};

connectButton.addEventListener('click', connectButtonHandler);
disconnectButton.addEventListener('click', disconnectButtonHandler);
processButton.addEventListener('click', processButtonHandler);
