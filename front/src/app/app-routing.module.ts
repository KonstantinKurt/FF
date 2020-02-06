import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ErrorComponent} from './shared/error/error.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: './Auth/auth.module#AuthModule'
  },
  {
    path: 'error',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

