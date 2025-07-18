import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReaderComponent } from './components/reader.component';
import { defineComponents, DocumentReaderDeviceDetailType } from '@regulaforensics/vp-frontend-document-device';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, ReaderComponent],
})
export class AppComponent implements OnInit {
    isOpen: boolean = false;

    ngOnInit() {
        defineComponents();
    }

    documentReaderHandler(data: CustomEvent<DocumentReaderDeviceDetailType>) {
        if (data.detail.action === 'PROCESS_FINISHED') {
            const status = data.detail.data?.status;
            const isFinishStatus = status === 1;

            if (!isFinishStatus || !data.detail.data?.response) return;
            console.log(data.detail.data.response);
        }

        if (data.detail?.action === 'CLOSE') {
            this.isOpen = false;
        }
    }
}
