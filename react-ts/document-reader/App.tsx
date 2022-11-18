import * as React from 'react';
import {
    defineComponents,
    DocumentReaderService,
    DocumentReaderWebComponent,
    DocumentReaderDetailType,
} from '@regulaforensics/vp-frontend-document-components';

function App(): JSX.Element {
    const component = React.useRef<DocumentReaderWebComponent>(null);
    const memoizedListener = React.useCallback((data: CustomEvent<DocumentReaderDetailType>) => {
        if (data.detail) {
            const response = data.detail; // The response of the component will be located here
            console.log(response);
        }
    }, []);

    React.useEffect(() => {
        const componentCurrent = component.current;

        window.RegulaDocumentSDK = new DocumentReaderService();

        defineComponents().then(async () => {
            await window.RegulaDocumentSDK.prepare();
        });

        if (componentCurrent) {
            componentCurrent.addEventListener('document-reader', memoizedListener);
        }

        return () => {
            if (componentCurrent) {
                componentCurrent.removeEventListener('document-reader', memoizedListener);
            }
        }
    }, []);

    return <document-reader ref={component} start-screen></document-reader>;
}

export default App;
