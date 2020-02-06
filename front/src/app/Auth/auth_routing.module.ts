import {NgModule} from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {SuccessfulComponent} from './successful/successful.component';
import {ConfirmEmailComponent} from './confirm-email/confirm-email.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'successful',
    component: SuccessfulComponent
  },
  {
    path: 'confirm',
    component: ConfirmEmailComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class AuthRoutingModule {
}
