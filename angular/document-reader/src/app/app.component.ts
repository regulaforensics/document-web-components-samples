import { Component, OnInit, OnDestroy } from '@angular/core';

import { ReaderComponent } from './components/reader.component';
import {
  EventActions,
  defineComponents,
  DocumentReaderService,
  InternalScenarios,
  DocumentReaderDetailType,
  TransactionEvent
} from '@regulaforensics/vp-frontend-document-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ReaderComponent],
})
export class AppComponent implements OnInit, OnDestroy {
  isOpen: boolean = false;

  ngOnInit() {
    window.RegulaDocumentSDK = new DocumentReaderService();
    window.RegulaDocumentSDK.recognizerProcessParam = {
      processParam: {
        scenario: InternalScenarios.MrzAndLocate,
        multipageProcessing: true,
      },
    };
    window.RegulaDocumentSDK.imageProcessParam = {
      processParam: {
        scenario: InternalScenarios.MrzAndLocate,
      },
    };

    defineComponents().then(() => window.RegulaDocumentSDK.initialize());
    // To use the document-reader component on test environments, you have to set the base64 license
    // defineComponents().then(() => window.RegulaDocumentSDK.initialize({ license: 'YOUR_BASE64_LICENSE_KEY' }));
  }

  ngOnDestroy() {
    window.RegulaDocumentSDK.shutdown();
  }

  documentReaderHandler(data: CustomEvent<DocumentReaderDetailType | TransactionEvent>) {
    if (data.detail.action === EventActions.PROCESS_FINISHED) {
      const status = data.detail.data?.status;
      const isFinishStatus = status === 1 || status === 2;

      if (!isFinishStatus || !data.detail.data?.response) return;
      console.log(data.detail.data.response);
    }

    if (data.detail?.action === EventActions.CLOSE) {
      this.isOpen = false;
    }
  }
}
