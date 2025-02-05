import * as React from "react";
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

interface ResponseWithLog {
  log?: any;
}

const hasLogField = (response: unknown): response is ResponseWithLog => {
  return typeof response === 'object' && response !== null && 'log' in response;
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

const getItems = (isLoading: boolean, response: unknown) => {
  if (isLoading) {
    return [{ id: 'Results', label: 'Results', children: <StatusLoader /> }];
  }

  const items = [
    { id: 'Results', label: 'Results', children: <ResultsTab /> },
    { id: 'Request', label: 'Request', children: <RequestViewer /> },
    { id: 'Response', label: 'Response', children: <ResponseViewer /> },
  ];

  if (hasLogField(response)) {
    items.push({ id: 'Logs', label: 'Logs', children: <Logs/> });
  }

  return items;
};

export const ReactComponent: React.FC<ProcessingResultsProps> = ({
  response,
  request,
  language,
}) => {
  const isLoading = !response || !request
  const items = getItems(isLoading, response);

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
