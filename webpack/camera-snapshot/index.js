import { defineComponents } from '@regulaforensics/vp-frontend-document-components';

const container = document.querySelector('#container');
const button = document.querySelector('#button');

defineComponents();

function createCameraSnapshot() {
    const cameraSnapshot = document.createElement('camera-snapshot');

    cameraSnapshot.settings = {
        startScreen: true,
        changeCameraButton: true,
    }

    return cameraSnapshot;
}

function cameraSnapshotListener(data) {
    if (data.detail.action === 'PROCESS_FINISHED') {
        const status = data.detail.data?.status;
        const isFinishStatus = status === 1;

        if (!isFinishStatus || !data.detail.data?.response) return;
        console.log(data.detail.data.response);
    }
    if (data.detail?.action === 'CLOSE') {
        const cameraSnapshot = document.querySelector('camera-snapshot');

        if (cameraSnapshot) {
            cameraSnapshot.remove();
        }

        button.style.display = 'block';
    }
}

function buttonListener(event) {
    container.append(createCameraSnapshot());
    event.target.style.display = 'none';
}

container.addEventListener('camera-snapshot', cameraSnapshotListener);
button.addEventListener('click', buttonListener);
