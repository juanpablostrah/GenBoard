import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { partidasRoutes } from './partidas-routes';

@NgModule({
  imports: [
    RouterModule.forChild(partidasRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PartidasRoutingModule {

}
