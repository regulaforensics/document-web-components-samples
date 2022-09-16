import { HTMLAttributes, DetailedHTMLProps } from 'react';
import {
    DocumentReaderWebComponent,
    DocumentReaderCaptureWebComponent,
    FullScreenContainer,
    IDocumentReader,
    ICameraSnapshot,
    IBaseComponent,
} from '@regulaforensics/vp-frontend-document-components';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'document-reader': DetailedHTMLProps<IDocumentReader & HTMLAttributes<DocumentReaderWebComponent>,
                DocumentReaderWebComponent>;
            'camera-snapshot': DetailedHTMLProps<ICameraSnapshot & HTMLAttributes<DocumentReaderCaptureWebComponent>,
                DocumentReaderCaptureWebComponent>;
            'fullscreen-container': DetailedHTMLProps<IBaseComponent & HTMLAttributes<FullScreenContainer>,
                FullScreenContainer>;
        }
    }
}