import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthRoutingModule} from './auth_routing.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {SuccessfulComponent} from './successful/successful.component';
import {LoginService} from './login/login.service';
import {RegisterService} from './register/register.service';
import { AuthNavbarComponent } from './auth-navbar/auth-navbar.component';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        SuccessfulComponent,
        AuthNavbarComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        AuthRoutingModule,
    ],
    providers: [
        LoginService,
        RegisterService,
    ],
})
export class AuthModule {
}
