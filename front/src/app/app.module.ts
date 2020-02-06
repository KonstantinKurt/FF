import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { ErrorComponent } from './shared/error/error.component';

@NgModule({
    declarations: [
        AppComponent,
        ErrorComponent,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    providers: [
   ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
