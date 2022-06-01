import './node_modules/@regulaforensics/vp-frontend-document-components/dist/main.js';

const component = document.getElementsByTagName('camera-snapshot')[0];

let isCameraAllowed = true;

async function getVideosDevices() {
    let devices;
    let videoDevices;

    const requestCameraAccess = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
        });

        stream.getTracks().forEach((track) => track.stop());
    }

    const setVideoDevices = async () => {
        devices = await navigator.mediaDevices.enumerateDevices();
        videoDevices = devices.filter((device) => device.kind === 'videoinput');
    }

    await setVideoDevices();

    if (videoDevices.length) {
        isCameraAllowed = videoDevices.every((device) => device.label !== '')
    }

    if (!isCameraAllowed) {
        await requestCameraAccess();
        await setVideoDevices();
    }

    return videoDevices;
}

window.addEventListener('load', () => {
    getVideosDevices()
        .then((devices) => {
            const allowedCameraIds = devices
                .filter((device) => device.kind === 'videoinput' && device.deviceId)
                .map(({deviceId}) => deviceId);

            isCameraAllowed = allowedCameraIds.length ? true : false;

            !isCameraAllowed
                ? component.classList.add('camera-id--hide')
                : component.classList.remove('camera-id--hide')

            // Choose camera ID from allowedCameraIds array and set it for camera-id attribute
            component.setAttribute('camera-id', allowedCameraIds[0])
        });
});
