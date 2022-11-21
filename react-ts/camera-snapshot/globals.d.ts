import { HTMLAttributes, DetailedHTMLProps } from 'react';
import {
    DocumentReaderCaptureWebComponent,
    FullScreenContainer,
    ICameraSnapshot,
    IBaseComponent,
} from '@regulaforensics/vp-frontend-document-components';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'camera-snapshot': DetailedHTMLProps<ICameraSnapshot & HTMLAttributes<DocumentReaderCaptureWebComponent>,
                DocumentReaderCaptureWebComponent>;
            'fullscreen-container': DetailedHTMLProps<IBaseComponent & HTMLAttributes<FullScreenContainer>,
                FullScreenContainer>;
        }
    }
}
