import {
  DocumentReaderDeviceWebComponent,
  DocumentReaderDeviceDetailType
} from '@regulaforensics/vp-frontend-document-device';

declare global {
  interface HTMLElementTagNameMap {
    'document-reader-device': DocumentReaderDeviceWebComponent;
  }

  interface HTMLElementEventMap {
    'document-reader-device': CustomEvent<DocumentReaderDeviceDetailType>;
  }
}
