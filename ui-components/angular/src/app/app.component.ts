import { DocumentReaderApi, Configuration, Scenario } from '@regulaforensics/document-reader-webclient';

import { Component } from '@angular/core';
import { ComponentProps } from 'react';
import { ReactWrapper } from './components/react-wrapper/react-wrapper.component';
import { ReactComponent } from './components/react-component/react-component';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ReactWrapper, MenuComponent],
})
export class AppComponent {
  processingData: { mode: 'sample' | 'upload'; base64: string } | null = null;
  isLoading = false;
  processingResults = ReactComponent;
  processingResultsProps: ComponentProps<typeof ReactComponent> = {
    response: null,
    request: null,
    language: 'en'
  }

  setProcessingData(data: { mode: 'sample' | 'upload'; base64: string }) {
    this.processingData = data;
    this.processImage();
  }

  processImage() {
    if (!this.processingData) return;

    const configuration = new Configuration({ basePath: 'https://api.regulaforensics.com' });
    const api = new DocumentReaderApi(configuration);
    const request = {
      images: [this.processingData.base64],
      processParam: {
        scenario: Scenario.FULL_PROCESS,
        alreadyCropped: this.processingData.mode === 'sample',
      }
    };

    this.isLoading = true;
    this.processingResultsProps = { ...this.processingResultsProps, response: null };

    api.process(request).then((res) => {
      this.processingResultsProps = {
        ...this.processingResultsProps,
        response: res.rawResponse,
        request
      };
      this.isLoading = false;
    });
  }

  get showComponent(): boolean {
    return this.isLoading || (!this.isLoading && this.processingResultsProps.response !== null);
  }
}
