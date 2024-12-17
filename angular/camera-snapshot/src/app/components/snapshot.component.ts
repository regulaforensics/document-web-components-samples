import { Component, AfterViewInit, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { type DocumentReaderCaptureWebComponent } from '@regulaforensics/vp-frontend-document-components';

@Component({
    selector: 'app-snapshot',
    templateUrl: './snapshot.component.html',
    styleUrls: ['./snapshot.component.css'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SnapshotComponent implements AfterViewInit {
    @ViewChild('snapshot', { static: false }) snapshot?: ElementRef<DocumentReaderCaptureWebComponent>;

    ngAfterViewInit() {
        if (!this.snapshot) return;

        this.snapshot.nativeElement.settings = {
            startScreen: true,
            changeCameraButton: true,
        };
    }
}
