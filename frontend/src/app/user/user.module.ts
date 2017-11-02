import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, CanActivate } from '@angular/router';

import { AuthGuard } from './_guards/auth.guard';

import { AuthenticationService } from './_services/authentication.service';

import { UserComponent } from './user.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const ROUTES = [
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/login',
    component: LoginComponent
  },
  {
    path: 'user/logout',
    component: LogoutComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [
    UserComponent,
    LoginComponent,
    LogoutComponent
  ],
  providers: [
    AuthGuard,
    AuthenticationService
  ]
})
export class UserModule { }
