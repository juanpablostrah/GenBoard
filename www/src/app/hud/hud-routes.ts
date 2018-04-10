import { Routes } from '@angular/router';

import { HUDComponent } from './hud.component';

export const hudRoutes: Routes = [{
  path: '',
  component: HUDComponent,
  loadChildren: 'app/routing/app-routing.module#AppRoutingModule'
}];
