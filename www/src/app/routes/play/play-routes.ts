import { Routes } from '@angular/router';
import { PlayComponent } from './play.component';

export const playRoutes: Routes = [{
  path: ':partidaId/:actorId',
  component: PlayComponent
}];
