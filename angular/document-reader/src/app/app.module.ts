import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReaderComponent } from './components/reader.component';

@NgModule({
    declarations: [
        AppComponent,
        ReaderComponent,
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
