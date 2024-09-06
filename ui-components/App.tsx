import { useEffect, useState } from 'react';
import {
  DocumentReaderApi,
  Configuration,
  Scenario,
  InlineResponse2001,
  ProcessRequest,
} from '@regulaforensics/document-reader-webclient';
import { ResultTabs } from './components/ResultTabs';
import { Menu } from './components/Menu';
import './styles.css';

interface ProcessingData {
  mode: 'sample' | 'upload'
  base64: string
}

export const App = () => {
  const [processingData, setProcessingData] = useState<ProcessingData | null>(null);
  const [response, setResponse] = useState<InlineResponse2001 | null>(null);
  const [request, setRequest] = useState<ProcessRequest | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const showComponent = isLoading || (!isLoading && response);

  useEffect(() => {
    if (!processingData) return;

    const configuration = new Configuration({ basePath: 'https://api.regulaforensics.com' });
    const api = new DocumentReaderApi(configuration);
    const request = {
      images: [ processingData.base64 ],
      processParam: {
        log: true,
        scenario: Scenario.FULL_PROCESS,
        alreadyCropped: processingData.mode === 'sample',
      }
    };

    setIsLoading(true);
    setResponse(null);
    api.process(request).then((res) => {
      setResponse(res.rawResponse);
      setRequest(request);
      setIsLoading(false);
    });
  }, [processingData]);

  return (
    <div className='container'>
      <Menu setProcessingData={ setProcessingData } />
      { showComponent && (
        <ResultTabs
          response={ response }
          request={ request }
          language='en'
        />
      ) }
    </div>
  );
};
