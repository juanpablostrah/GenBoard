import { Routes } from '@angular/router';
import { Error404Component } from 'app/routes/error-404/error-404.component';
import { AuthGuard } from 'app/services/auth/auth.guard';
import { NoAuthGuard } from 'app/services/auth/no-auth.guard';

export const routes: Routes = [{
  path: '',
  canActivate: [AuthGuard],
  loadChildren: 'app/hud/hud.module#HUDModule'
},{
  path: 'auth',
  canActivate: [NoAuthGuard],
  loadChildren: 'app/routes/auth/auth.module#AuthModule'
},{
  path: 'not-found',
  component: Error404Component
},{ // otherwise redirect to 404
  path: '**',
  redirectTo: 'not-found'
}];
