import { DocumentReaderWebComponent } from '@regulaforensics/vp-frontend-document-components';

declare global {
  interface HTMLElementTagNameMap {
    'document-reader': DocumentReaderWebComponent;
  }
}
