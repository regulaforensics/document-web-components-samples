import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnapshotComponent } from './components/snapshot.component';
import {
    EventActions,
    defineComponents,
    type CameraSnapshotDetailType
} from '@regulaforensics/vp-frontend-document-components';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, SnapshotComponent],
})
export class AppComponent implements OnInit {
    isOpen: boolean = false;

    ngOnInit(): void {
        void defineComponents();
    }

    cameraSnapshotHandler(data: CustomEvent<CameraSnapshotDetailType>) {
        if (data.detail.action === EventActions.PROCESS_FINISHED) {
            const status = data.detail.data?.status;
            const isFinishStatus = status === 1;

            if (!isFinishStatus || !data.detail.data?.response) return;
            console.log(data.detail.data.response);
        }

        if (data.detail?.action === EventActions.CLOSE) {
            this.isOpen = false;
        }
    }
}
