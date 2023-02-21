import { Component, OnInit } from '@angular/core';
import { CameraSnapshotDetailType, defineComponents } from '@regulaforensics/vp-frontend-document-components';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    ngOnInit(): void {
        defineComponents();
    }

    cameraSnapshotHandler(e: CustomEvent<CameraSnapshotDetailType>) {
        console.log(e);
    }
}
