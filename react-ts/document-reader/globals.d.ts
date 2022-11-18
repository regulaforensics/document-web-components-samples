import { HTMLAttributes, DetailedHTMLProps } from 'react';
import {
    DocumentReaderWebComponent,
    DocumentReaderService,
    FullScreenContainer,
    IDocumentReader,
    IBaseComponent,
} from '@regulaforensics/vp-frontend-document-components';

declare global {
    interface Window {
        RegulaDocumentSDK: DocumentReaderService;
    }

    namespace JSX {
        interface IntrinsicElements {
            'document-reader': DetailedHTMLProps<IDocumentReader & HTMLAttributes<DocumentReaderWebComponent>,
                DocumentReaderWebComponent>;
            'fullscreen-container': DetailedHTMLProps<IBaseComponent & HTMLAttributes<FullScreenContainer>,
                FullScreenContainer>;
        }
    }
}
