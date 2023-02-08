import { Component, OnInit } from '@angular/core';
import { defineComponents } from '@regulaforensics/vp-frontend-document-components';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    ngOnInit(): void {
        defineComponents();
    }
}
