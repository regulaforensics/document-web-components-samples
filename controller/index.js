const { DocumentReaderController } = window.Regula;
const service = new DocumentReaderController();

service.serviceUrl = 'SERVICE_URL';

const connectButton = document.getElementById('connect');
const disconnectButton = document.getElementById('disconnect');
const autoScanButton = document.getElementById('autoscan');
const processButton = document.getElementById('process');
const status = document.getElementById('status');
let autoScan = true;

const responseListener = async () => {
    const response = await service.getLastResults();

    processButton.removeAttribute('disabled');
    autoScanButton.removeAttribute('disabled');
    status.textContent = 'You can see the result in the console';

    console.log(response);
};

const autoScanButtonHandler = async () => {
    await service.setProperty('AutoScan', !autoScan);

    autoScan = !autoScan;
    autoScanButton.textContent = autoScan ? 'Auto-scan: on' : 'Auto-scan: off';
};

const toggleButtons = (connected) => {
    connectButton.disabled = connected;
    disconnectButton.disabled = !connected;
    processButton.disabled = !connected;
    autoScanButton.disabled = !connected;
    status.textContent = connected ? 'Service connected' : 'Service disconnected';
};

const connectButtonHandler = async () => {
    status.textContent = 'Connecting...';

    await service.initRegulaReader();
    service.hubProxy?.on('OnProcessingFinished', responseListener);

    // You can set the processing parameters
    const processParam = {
        processParam: {
            dateFormat: 'yyyy.MM.dd',
        },
    };
    await service.setProperty('processingParams', JSON.stringify(processParam));

    toggleButtons(true);
};

const disconnectButtonHandler = () => {
    service.disconnect();
    service.hubProxy?.off('OnProcessingFinished', responseListener);

    toggleButtons(false);
};

const processButtonHandler = async () => {
    await service.getImages();

    processButton.disabled = true;
    autoScanButton.disabled = true;
    status.textContent = 'Processing...';
};

connectButton.addEventListener('click', connectButtonHandler);
disconnectButton.addEventListener('click', disconnectButtonHandler);
processButton.addEventListener('click', processButtonHandler);
autoScanButton.addEventListener('click', autoScanButtonHandler);
