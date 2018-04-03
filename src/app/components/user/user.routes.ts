import {Routes } from '@angular/router';
import {UserDataComponent} from './user-data.component';
import {UserPasswordComponent} from './user-password.component';
import {UserPhotoComponent} from './user-photo.component';


export const USUARIO_ROUTES: Routes = [
  { path: 'data', component: UserDataComponent },
  { path: 'password', component: UserPasswordComponent },
  { path: 'photo', component: UserPhotoComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'data' }
];