import * as React from 'react';
import {
    DocumentReaderCaptureWebComponent,
    CameraSnapshotDetailType
} from '@regulaforensics/vp-frontend-document-components';

function App(): JSX.Element {
    const component = React.useRef<DocumentReaderCaptureWebComponent>(null);
    const memoizedListener = React.useCallback((data: CustomEvent<CameraSnapshotDetailType>) => {
        if (data.detail) {
            const response = data.detail; // The response of the component will be located here
            console.log(response);
        }
    }, []);

    React.useEffect(() => {
        const componentCurrent = component.current;

        if (componentCurrent) {
            componentCurrent.addEventListener('camera-snapshot', memoizedListener);
        }

        return () => {
            if (componentCurrent) {
                componentCurrent.removeEventListener('camera-snapshot', memoizedListener);
            }
        }
    }, []);

    return <camera-snapshot ref={component} start-screen></camera-snapshot>;
}

export default App;
