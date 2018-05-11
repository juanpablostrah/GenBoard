import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

export const authRoutes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [
    {path: 'auth', component: LoginComponent}
  ]
}];
