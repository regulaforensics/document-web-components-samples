import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { type DocumentReaderDeviceWebComponent } from '@regulaforensics/vp-frontend-document-components';

@Component({
    selector: 'app-reader',
    templateUrl: './reader.component.html',
    styleUrls: ['./reader.component.css'],
})
export class ReaderComponent implements AfterViewInit {
    @ViewChild('reader', { static: false }) reader?: ElementRef<DocumentReaderDeviceWebComponent>;

    ngAfterViewInit() {
        if (!this.reader) return;

        this.reader.nativeElement.settings = {
            serviceUrl: 'https://SERVICE_ADRESS:PORT'
        };
    }
}
