import { DocumentReaderResponseType } from '@regulaforensics/vp-frontend-document-components';
import {
    DocReaderContainer,
    Details,
    Info,
    Graphics,
    Rfid,
    ResponseViewer,
    Logs,
    PortraitsComparison,
    Tabs,
} from '@regulaforensics/ui-components';

const ResultsTab = () => (
    <>
        <Details />
        <Info />
        <Graphics />
        <Rfid />
        <PortraitsComparison />
    </>
);

type DocumentReaderResult = {
    response: DocumentReaderResponseType;
};

const Results = ({ response }: DocumentReaderResult) => {
    const items = [
        { id: 'Results', label: 'Results', children: <ResultsTab /> },
        { id: 'Response', label: 'Response', children: <ResponseViewer /> },
    ];

    if (response.rawResponse.log) {
        items.push({ id: 'Logs', label: 'Logs', children: <Logs /> });
    }

    return (
        <DocReaderContainer response={response.rawResponse}>
            <Tabs type={'card'} items={items} />
        </DocReaderContainer>
    );
};

export default Results;
