import {
  DocumentReaderWebComponent,
  DocumentReaderService,
} from '@regulaforensics/vp-frontend-document-components';

declare global {
  interface Window {
    RegulaDocumentSDK: DocumentReaderService;
  }

  interface HTMLElementTagNameMap {
    'document-reader': DocumentReaderWebComponent;
  }
}
