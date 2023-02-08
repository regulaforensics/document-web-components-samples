import { HTMLAttributes, DetailedHTMLProps } from 'react';
import {
    DocumentReaderWebComponent,
    DocumentReaderService,
    IDocumentReader,
} from '@regulaforensics/vp-frontend-document-components';

declare global {
    interface Window {
        RegulaDocumentSDK: DocumentReaderService;
    }

    namespace JSX {
        interface IntrinsicElements {
            'document-reader': DetailedHTMLProps<IDocumentReader & HTMLAttributes<DocumentReaderWebComponent>,
                DocumentReaderWebComponent>;
        }
    }
}
