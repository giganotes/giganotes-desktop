import { AuthGuard } from './guards/auth-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeRoutingModule } from './home/home-routing.module';
import { ForgotPasswordRoutingModule } from './forgot-password/forgot-password-routing.module';
import { LoginRoutingModule } from './login/login-routing.module';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home-routing.module#HomeRoutingModule', canActivate: [AuthGuard]},
  {
    path: 'login', loadChildren: './login/login-routing.module#LoginRoutingModule'
  },
  {
    path: 'restore-password', loadChildren: './forgot-password/forgot-password-routing.module#ForgotPasswordRoutingModule'
  }
  /*,
  {
    path: 'restore-password',
    component: ForgotPasswordComponent,
  },*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
