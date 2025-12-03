import { useEffect, useRef, useState } from 'react';
import {
    defineComponents,
    DocumentReaderService,
    DocumentReaderDetailType,
    TransactionEvent,
    DocumentReaderWebComponent,
    ResponseCode,
    EventActions,
    InternalScenarios,
    DocumentReaderResponseType,
} from '@regulaforensics/vp-frontend-document-components';
import Results from './Results';
import './styles.css';

enum Status {
    Start,
    Result,
    Processing,
}

const App = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const elemRef = useRef<DocumentReaderWebComponent>(null);
    const [response, setResponse] = useState<DocumentReaderResponseType | null>(null);
    const [status, setStatus] = useState<Status>(Status.Start);
    const [morePagesAvailable, setMorePagesAvailable] = useState(false);

    const listener = async (data: CustomEvent<DocumentReaderDetailType | TransactionEvent>) => {
        const action = data.detail.action;

        if (action === EventActions.PROCESS_FINISHED) {
            const status = data.detail.data?.status;
            const isFinishStatus = status === ResponseCode.OK || status === ResponseCode.TIMEOUT;
            const responseData = data.detail.data;

            if (isFinishStatus && responseData?.response) {
                setResponse(responseData.response);
                setStatus(Status.Result);
                setMorePagesAvailable(!!responseData?.response?.rawResponse.morePagesAvailable);
            }
        }
        if (data.detail?.action === EventActions.CLOSE || data.detail?.action === EventActions.CAMERA_PROCESS_CLOSED) {
            setResponse(null);
            setMorePagesAvailable(false);
            setStatus(Status.Start);
        }
    };

    const startDocument = () => {
        if (!window.RegulaDocumentSDK) return;

        void window.RegulaDocumentSDK.startNewDocument();
        setStatus(Status.Processing);
    };

    const startNewPage = () => {
        if (!window.RegulaDocumentSDK) return;

        void window.RegulaDocumentSDK.startNewPage();
        setStatus(Status.Processing);
    };

    useEffect(() => {
        window.RegulaDocumentSDK = new DocumentReaderService();
        window.RegulaDocumentSDK.recognizerProcessParam = {
            processParam: {
                scenario: InternalScenarios.MrzAndLocate,
                multipageProcessing: true,
            },
        };

        defineComponents().then(() => window.RegulaDocumentSDK.initialize());
        // To use the document-reader component on test environments, you have to set the base64 license
        // defineComponents().then(() => window.RegulaDocumentSDK.initialize({ license: 'YOUR_BASE64_LICENSE_KEY' }));

        const containerRefCurrent = containerRef.current;

        if (!containerRefCurrent) return;

        containerRefCurrent.addEventListener('document-reader', listener);

        return () => {
            window.RegulaDocumentSDK.shutdown();
            containerRefCurrent.removeEventListener('document-reader', listener);
        };
    }, []);

    useEffect(() => {
        const elementRefCurrent = elemRef.current;

        if (elementRefCurrent && status === Status.Processing) {
            elementRefCurrent.settings = {
                manualMultipageMode: true
            };
        }
    }, [status]);

    return (
        <div ref={containerRef}>
            {status === Status.Start && (
                <div className='buttons'>
                    <button className='button' onClick={startDocument}>
                        Open Document Reader
                    </button>
                </div>
            )}
            {status === Status.Result && (
                <>
                    <div className='buttons'>
                        <button className='button' onClick={startDocument}>
                            Try again
                        </button>
                        {morePagesAvailable && (
                            <button className='button' onClick={startNewPage}>
                                Start new page
                            </button>
                        )}
                    </div>
                    {response && (
                        <div className='results-container'>
                            <Results response={response} />
                        </div>
                    )}
                </>
            )}
            {status === Status.Processing && (
                <div className='reader-container'>
                    <document-reader new-layout ref={elemRef} />
                </div>
            )}
        </div>
    );
};

export default App;
