import { HTMLAttributes, DetailedHTMLProps } from 'react';
import {
    FaceLivenessWebComponent,
    FaceDetectionWebComponent,
    DocumentReaderWebComponent,
    DocumentReaderCaptureWebComponent,
    FullScreenContainer,
    IFaceLiveness,
    IFaceDetection,
    IDocumentReader,
    ICameraSnapshot,
    IBaseComponent,
} from '@regulaforensics/vp-frontend-document-components';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'face-liveness': DetailedHTMLProps<IFaceLiveness & HTMLAttributes<FaceLivenessWebComponent>,
                FaceLivenessWebComponent>;
            'face-capture': DetailedHTMLProps<IFaceDetection & HTMLAttributes<FaceDetectionWebComponent>,
                FaceDetectionWebComponent>;
            'document-reader': DetailedHTMLProps<IDocumentReader & HTMLAttributes<DocumentReaderWebComponent>,
                DocumentReaderWebComponent>;
            'camera-snapshot': DetailedHTMLProps<ICameraSnapshot & HTMLAttributes<DocumentReaderCaptureWebComponent>,
                DocumentReaderCaptureWebComponent>;
            'fullscreen-container': DetailedHTMLProps<IBaseComponent & HTMLAttributes<FullScreenContainer>,
                FullScreenContainer>;
        }
    }
}