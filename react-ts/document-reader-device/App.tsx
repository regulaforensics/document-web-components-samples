import { useState, useRef, useEffect, CSSProperties } from 'react';
import {
  EventActions,
  defineComponents,
  type DocumentReaderDeviceDetailType,
  type DocumentReaderDeviceWebComponent,
} from '@regulaforensics/vp-frontend-document-device';

const containerStyle: CSSProperties = {
  display: 'flex',
  position: 'absolute',
  height: '100%',
  width: '100%',
  top: 0,
  left: 0,
  justifyContent: 'center',
  alignItems: 'center',
};

const buttonStyle: CSSProperties = {
  padding: '10px 30px',
  color: 'white',
  fontSize: '16px',
  borderRadius: '2px',
  backgroundColor: '#bd7dff',
  border: '1px solid #bd7dff',
  cursor: 'pointer',
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<DocumentReaderDeviceWebComponent>(null);

  useEffect(() => {
    const containerCurrent = containerRef.current;
    const listener = (data: CustomEvent<DocumentReaderDeviceDetailType>) => {
      if (data.detail.action === EventActions.PROCESS_FINISHED) {
        const status = data.detail.data?.status;
        const isFinishStatus = status === 1;

        if (!isFinishStatus || !data.detail.data?.response) return;
        console.log(data.detail.data.response);
      }

      if (data.detail?.action === EventActions.CLOSE) {
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

  useEffect(() => {
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
