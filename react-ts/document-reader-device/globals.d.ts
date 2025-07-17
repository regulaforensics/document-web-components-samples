import {
  DocumentReaderDeviceWebComponent,
  DocumentReaderDeviceDetailType
} from '@regulaforensics/vp-frontend-document-device';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'document-reader-device': React.DetailedHTMLProps<React.HTMLAttributes<DocumentReaderDeviceWebComponent>,
        DocumentReaderDeviceWebComponent>;
    }
  }

  interface HTMLElementEventMap {
    'document-reader-device': CustomEvent<DocumentReaderDeviceDetailType>;
  }
}
