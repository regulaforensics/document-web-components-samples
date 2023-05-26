import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SnapshotComponent } from './components/snapshot.component';
import { NgIf } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
        SnapshotComponent,
    ],
    imports: [
        BrowserModule,
        NgIf,
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
