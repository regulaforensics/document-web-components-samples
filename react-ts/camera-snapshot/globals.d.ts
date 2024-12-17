import {
  DocumentReaderCaptureWebComponent,
  ICameraSnapshot,
} from '@regulaforensics/vp-frontend-document-components';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'camera-snapshot': React.DetailedHTMLProps<ICameraSnapshot & React.HTMLAttributes<DocumentReaderCaptureWebComponent>,
        DocumentReaderCaptureWebComponent>;
    }
  }
}
