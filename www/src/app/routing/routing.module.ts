import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { Error404Module } from 'app/routes/error-404/error-404.module';
import { AuthGuard } from 'app/services/auth/auth.guard';
import { NoAuthGuard } from 'app/services/auth/no-auth.guard';

@NgModule({
  imports: [
    Error404Module,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard,
    NoAuthGuard
  ]
})
export class RoutingModule {}
