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

export const App = () => {
  const [base64, setBase64] = useState('');
  const [response, setResponse] = useState<InlineResponse2001>(null);
  const [request, setRequest] = useState<ProcessRequest>(null);
  const [isLoading, setIsLoading] = useState(false);
  const showComponent = isLoading || (!isLoading && response);

  useEffect(() => {
    if (!base64) return;

    const configuration = new Configuration({ basePath: 'https://nightly-api.regulaforensics.com' });
    const api = new DocumentReaderApi(configuration);
    const request = {
      images: [ base64 ],
      processParam: {
        scenario: Scenario.FULL_PROCESS,
      }
    };

    setIsLoading(true);
    setResponse(null);
    api.process(request).then((res) => {
      setResponse(res.rawResponse);
      setRequest(request);
      setIsLoading(false);
    });
  }, [base64]);

  return (
    <div className='container'>
      <Menu setBase64={ setBase64 } />
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
