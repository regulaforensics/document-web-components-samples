import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DocumentReaderWebComponent } from '@regulaforensics/vp-frontend-document-components';

@Component({
    selector: 'app-reader',
    templateUrl: './reader.component.html',
    styleUrls: ['./reader.component.css'],
})
export class ReaderComponent implements AfterViewInit {
    @ViewChild('reader', { static: false }) reader?: ElementRef<DocumentReaderWebComponent>;

    ngAfterViewInit() {
        if (!this.reader) return;

        this.reader.nativeElement.settings = {
            startScreen: true,
            changeCameraButton: true,
            devLicense: 'YOUR_BASE64_LICENSE', // Set only for development!
        };
    }
}
