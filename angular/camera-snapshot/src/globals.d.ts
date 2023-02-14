import { DocumentReaderCaptureWebComponent } from '@regulaforensics/vp-frontend-document-components';

declare global {
    interface HTMLElementTagNameMap {
        'camera-snapshot': DocumentReaderCaptureWebComponent;
    }
}
