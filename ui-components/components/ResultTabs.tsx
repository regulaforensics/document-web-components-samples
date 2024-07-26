import { FC } from 'react';
import {
  DocReaderContainer,
  Status,
  Info,
  Graphics,
  Rfid,
  ResponseViewer,
  RequestViewer,
  Logs,
  PortraitsComparison,
  StatusLoader,
  Tabs,
} from '@regulaforensics/ui-components';

interface ProcessingResultsProps {
  response: unknown
  request: any
  language: string
}

const ResultsTab = () => (
  <>
    <Status/>
    <Info/>
    <Graphics/>
    <Rfid/>
    <PortraitsComparison/>
  </>
);

const getItems = (isLoading: boolean) => {
  if (isLoading) {
    return [{ id: 'Results', label: 'Results', children: <StatusLoader /> }];
  }

  return [
    { id: 'Results', label: 'Results', children: <ResultsTab /> },
    { id: 'Request', label: 'Request', children: <RequestViewer /> },
    { id: 'Response', label: 'Response', children: <ResponseViewer /> },
    { id: 'Logs', label: 'Logs', children: <Logs /> },
  ];
};

export const ResultTabs: FC<ProcessingResultsProps> = ({
  response,
  request,
  language,
}) => {
  const isLoading = !response || !request
  const items = getItems(isLoading);

  return (
    <DocReaderContainer
      response={ response }
      request={ request }
      language={ language }
    >
      <Tabs
        type='card'
        items={ items }
        initialTab={ isLoading ? 'Results' : undefined }
      />
    </DocReaderContainer>
  )
};
