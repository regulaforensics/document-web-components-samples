import { HTMLAttributes, DetailedHTMLProps } from 'react';
import {
  DocumentReaderCaptureWebComponent,
  ICameraSnapshot,
} from '@regulaforensics/vp-frontend-document-components';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'camera-snapshot': DetailedHTMLProps<ICameraSnapshot & HTMLAttributes<DocumentReaderCaptureWebComponent>,
        DocumentReaderCaptureWebComponent>;
    }
  }
}
