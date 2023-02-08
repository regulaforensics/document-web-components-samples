import { Component, OnInit } from '@angular/core';
import { defineComponents, DocumentReaderService } from '@regulaforensics/vp-frontend-document-components';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    ngOnInit(): void {
        window.RegulaDocumentSDK = new DocumentReaderService();

        defineComponents().then(async () => {
            await window.RegulaDocumentSDK.prepare();
        });
    }
}
