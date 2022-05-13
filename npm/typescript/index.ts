// Importing the component
import '@document-component';
// Importing types
import {ICustomEvent, ICustomEventListener, CameraSnapshotDetailType} from '@document-types';


// Get our component
const component: ICameraSnapshot = document.getElementsByTagName('camera-snapshot')[0];

// Creating an event listener
const listener: ICustomEventListener<CameraSnapshotDetailType> = (data: ICustomEvent<CameraSnapshotDetailType>): void => {
    if (data.detail) {
        const response = data.detail; // The response of the component will be located here
        console.log(response); // Doing something with the response
    }
}

// Adding an event listener to our component
component.addEventListener('camera-snapshot', listener);