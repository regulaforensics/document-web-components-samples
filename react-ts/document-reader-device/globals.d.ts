import { DocumentReaderDeviceWebComponent } from '@regulaforensics/vp-frontend-document-components';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'document-reader-device': React.DetailedHTMLProps<React.HTMLAttributes<DocumentReaderDeviceWebComponent>,
        DocumentReaderDeviceWebComponent>;
    }
  }
}
