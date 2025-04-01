import { DocumentReaderWebComponent, IDocumentReader } from '@regulaforensics/vp-frontend-document-components';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'document-reader': React.DetailedHTMLProps<IDocumentReader & React.HTMLAttributes<DocumentReaderWebComponent>,
        DocumentReaderWebComponent>;
    }
  }
}
