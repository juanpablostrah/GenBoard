import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { Error404Module } from 'app/routes/error-404/error-404.module';

@NgModule({
  imports: [
    Error404Module,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule {}
