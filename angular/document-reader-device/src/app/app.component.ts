import { Component, OnInit } from '@angular/core';
import {
    defineComponents,
    DocumentReaderDetailType,
} from '@regulaforensics/vp-frontend-document-components-beta';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    isOpen: boolean = false;

    ngOnInit() {
        defineComponents();
    }

    documentReaderHandler(data: CustomEvent<DocumentReaderDetailType>) {
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
