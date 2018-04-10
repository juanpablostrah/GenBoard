import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { hudRoutes } from './hud-routes';

@NgModule({
  imports: [
    RouterModule.forChild(hudRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class HUDRoutingModule {

}
