import { Routes } from '@angular/router';
import { Error404Component } from 'app/routes/error-404/error-404.component';

export const routes: Routes = [/*{
  path: '',
  redirectTo: '/',
  pathMatch: 'full'
},*/{
  path: '',
  loadChildren: 'app/hud/hud.module#HUDModule'
},{
  path: 'auth',
  loadChildren: 'app/routes/auth/auth.module#AuthModule'
},{
  path: 'not-found',
  component: Error404Component
},{ // otherwise redirect to 404
  path: '**',
  redirectTo: 'not-found'
}];
