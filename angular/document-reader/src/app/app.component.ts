import { Component, OnInit } from '@angular/core';
import {
    defineComponents,
    DocumentReaderDetailType,
    DocumentReaderService,
} from '@regulaforensics/vp-frontend-document-components';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    isOpen: boolean = false;

    ngOnInit() {
        window.RegulaDocumentSDK = new DocumentReaderService();

        defineComponents().then(async () => {
            await window.RegulaDocumentSDK.prepare();
        });
    }

    documentReaderHandler(data: CustomEvent<DocumentReaderDetailType>) {
        if (data.detail.action === 'PROCESS_FINISHED') {
            const status = data.detail.data?.status;
            const isFinishStatus = status === 1 || status === 2;

            if (isFinishStatus && data.detail.data?.response) {
                console.log(data.detail.data.response);
            }
        }

        if (data.detail?.action === 'CLOSE') {
            this.isOpen = false;
        }
    }
}
