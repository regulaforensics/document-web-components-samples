import * as React from 'react';
import {
    defineComponents,
    DocumentReaderDetailType,
    DocumentReaderDeviceWebComponent,
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
    const elementRef = React.useRef<DocumentReaderDeviceWebComponent>(null);

    React.useEffect(() => {
        const containerCurrent = containerRef.current;
        const listener = (data: CustomEvent<DocumentReaderDetailType>) => {
            if (data.detail.action === 'PROCESS_FINISHED') {
                const status = data.detail.data?.status;
                const isFinishStatus = status === 1;

                if (!isFinishStatus || !data.detail.data?.response) return;
                console.log(data.detail.data.response);
            }

            if (data.detail?.action === 'CLOSE') {
                setIsOpen(false);
            }
        };

        void defineComponents();

        if (!containerCurrent) return;

        containerCurrent.addEventListener('document-reader-device', listener);

        return () => {
            containerCurrent.removeEventListener('document-reader-device', listener);
        }
    }, []);

    React.useEffect(() => {
        const elementRefCurrent = elementRef.current;

        if (!elementRefCurrent) return;

        elementRefCurrent.settings = {
            serviceUrl: 'SERVICE_URL',
        };
    }, [isOpen]);

    return (
        <div style={containerStyle} ref={containerRef}>
            {isOpen ? (
                <document-reader-device ref={elementRef}></document-reader-device>
            ) : (
                <button style={buttonStyle} onClick={() => setIsOpen(true)}>Open component</button>
            )}
        </div>
    );
}

export default App;
