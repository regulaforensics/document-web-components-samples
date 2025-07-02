import { CSSProperties, useLayoutEffect, useRef, useState } from 'react';
import {
  EventActions,
  defineComponents,
  type CameraSnapshotDetailType,
  type DocumentReaderCaptureWebComponent,
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
  const elementRef = useRef<DocumentReaderCaptureWebComponent>(null);
  const listener = (data: CustomEvent<CameraSnapshotDetailType>) => {
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

  useLayoutEffect(() => {
    const containerCurrent = containerRef.current;

    void defineComponents();

    if (!containerCurrent) return;

    containerCurrent.addEventListener('camera-snapshot', listener);

    return () => {
      containerCurrent.removeEventListener('camera-snapshot', listener);
    }
  }, []);

  useLayoutEffect(() => {
    const elementRefCurrent = elementRef.current;

    if (!elementRefCurrent) return;

    elementRefCurrent.settings = {
      changeCameraButton: true,
    };
  }, [isOpen]);

  return (
    <div style={containerStyle} ref={containerRef}>
      {isOpen ? (
        <camera-snapshot start-screen ref={elementRef}></camera-snapshot>
      ) : (
        <button style={buttonStyle} onClick={() => setIsOpen(true)}>Open component</button>
      )}
    </div>
  );
}

export default App;
