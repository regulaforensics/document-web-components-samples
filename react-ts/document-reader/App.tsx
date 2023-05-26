import * as React from 'react';
import {
    defineComponents,
    DocumentReaderDetailType,
    DocumentReaderService,
    DocumentReaderWebComponent,
} from '@regulaforensics/vp-frontend-document-components';

const containerStyle = {
    display: 'flex',
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
} as React.CSSProperties;

const buttonStyle = {
    padding: '10px 30px',
    color: 'white',
    fontSize: '16px',
    borderRadius: '2px',
    backgroundColor: '#bd7dff',
    border: '1px solid #bd7dff',
    cursor: 'pointer',
} as React.CSSProperties;

function App() {
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const elementRef = React.useRef<DocumentReaderWebComponent>(null);
    const listener = (data: CustomEvent<DocumentReaderDetailType>) => {
        if (data.detail.action === 'PROCESS_FINISHED') {
            const status = data.detail.data?.status;
            const isFinishStatus = status === 1 || status === 2;

            if (!isFinishStatus || !data.detail.data?.response) return;
            console.log(data.detail.data.response);
        }

        if (data.detail?.action === 'CLOSE') {
            setIsOpen(false);
        }
    };

    React.useEffect(() => {
        const containerCurrent = containerRef.current;

        window.RegulaDocumentSDK = new DocumentReaderService();

        defineComponents().then(async () => {
            await window.RegulaDocumentSDK.prepare();
        });

        if (!containerCurrent) return;

        containerCurrent.addEventListener('document-reader', listener);

        return () => {
            containerCurrent.removeEventListener('document-reader', listener);
        }
    }, []);

    React.useEffect(() => {
        const elementRefCurrent = elementRef.current;

        if (!elementRefCurrent) return;

        elementRefCurrent.settings = {
            startScreen: true,
            changeCameraButton: true,
            devLicense: 'YOUR_BASE64_LICENSE', // Set only for development!
        };
    }, [isOpen]);

    return (
        <div style={containerStyle} ref={containerRef}>
            {isOpen ? (
                <document-reader ref={elementRef}></document-reader>
            ) : (
                <button style={buttonStyle} onClick={() => setIsOpen(true)}>Open component</button>
            )}
        </div>
    );
}

export default App;
