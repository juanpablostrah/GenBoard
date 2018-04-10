import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { playRoutes } from './play-routes';

@NgModule({
  imports: [
    RouterModule.forChild(playRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PlayRoutingModule {

}
