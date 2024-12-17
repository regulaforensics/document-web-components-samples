import {
  DocumentReaderWebComponent,
  DocumentReaderService,
  IDocumentReader,
} from '@regulaforensics/vp-frontend-document-components';

declare global {
  interface Window {
    RegulaDocumentSDK: DocumentReaderService;
  }

  namespace React.JSX {
    interface IntrinsicElements {
      'document-reader': React.DetailedHTMLProps<IDocumentReader & React.HTMLAttributes<DocumentReaderWebComponent>,
        DocumentReaderWebComponent>;
    }
  }
}
