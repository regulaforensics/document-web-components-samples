import { HTMLAttributes, DetailedHTMLProps } from 'react';
import { DocumentReaderDeviceWebComponent } from '@regulaforensics/vp-frontend-document-components';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'document-reader-device': DetailedHTMLProps<HTMLAttributes<DocumentReaderDeviceWebComponent>,
                DocumentReaderDeviceWebComponent>;
        }
    }
}
