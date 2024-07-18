import { useState, useRef, useEffect, CSSProperties } from 'react';
import {
  defineComponents,
  DocumentReaderDetailType,
  DocumentReaderService,
  DocumentReaderWebComponent,
} from '@regulaforensics/vp-frontend-document-components';

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
  const elementRef = useRef<DocumentReaderWebComponent>(null);
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

  useEffect(() => {
    const containerCurrent = containerRef.current;

    window.RegulaDocumentSDK = new DocumentReaderService();
    window.RegulaDocumentSDK.recognizerProcessParam = {
      processParam: {
        scenario: 'MrzAndLocate',
        multipageProcessing: true,
      },
    };
    window.RegulaDocumentSDK.imageProcessParam = {
      processParam: {
        scenario: 'MrzAndLocate',
      },
    };

    defineComponents().then(() => window.RegulaDocumentSDK.initialize());
    // To use the document-reader component on test environments, you have to set the base64 license
    // defineComponents().then(() => window.RegulaDocumentSDK.initialize({ license: 'YOUR_BASE64_LICENSE_KEY' }));

    if (!containerCurrent) return;

    containerCurrent.addEventListener('document-reader', listener);

    return () => {
      window.RegulaDocumentSDK.shutdown();
      containerCurrent.removeEventListener('document-reader', listener);
    }
  }, []);

  useEffect(() => {
    const elementRefCurrent = elementRef.current;

    if (!elementRefCurrent) return;

    elementRefCurrent.settings = {
      startScreen: true,
      changeCameraButton: true,
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
