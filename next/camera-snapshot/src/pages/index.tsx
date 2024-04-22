import Head from 'next/head';
import { useEffect, useRef, useState, CSSProperties } from 'react';
import { CameraSnapshotDetailType, DocumentReaderCaptureWebComponent } from '@regulaforensics/vp-frontend-document-components';

const containerStyle = {
  display: 'flex',
  position: 'absolute',
  height: '100%',
  width: '100%',
  top: 0,
  left: 0,
  justifyContent: 'center',
  alignItems: 'center',
} as CSSProperties;

const buttonStyle = {
  padding: '10px 30px',
  color: 'white',
  fontSize: '16px',
  borderRadius: '2px',
  backgroundColor: '#bd7dff',
  border: '1px solid #bd7dff',
  cursor: 'pointer',
} as CSSProperties;

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<DocumentReaderCaptureWebComponent>(null);
  const listener = (data: CustomEvent<CameraSnapshotDetailType>) => {
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

  useEffect(() => {
    const initDocumentReaderService = async () => {
      const { defineComponents } = await import('@regulaforensics/vp-frontend-document-components');
      void defineComponents();
    };

    void initDocumentReaderService();

    const containerCurrent = containerRef.current;

    if (!containerCurrent) return;

    containerCurrent.addEventListener('camera-snapshot', listener);

    return () => {
      containerCurrent.removeEventListener('camera-snapshot', listener);
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
    <>
      <Head>
        <title>Document Reader</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main>
        <div style={containerStyle} ref={containerRef}>
          {isOpen ? (
            <camera-snapshot ref={elementRef}></camera-snapshot>
          ) : (
            <button style={buttonStyle} onClick={() => setIsOpen(true)}>Open component</button>
          )}
        </div>
      </main>
    </>
  );
}
