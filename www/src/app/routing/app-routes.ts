import { Routes } from '@angular/router';
import { Error404Component } from 'app/routes/error-404/error-404.component';
import { CreateComponent } from 'app/routes/partidas/create/create.component';

export const routes: Routes = [{
  path: '',
  loadChildren: 'app/routes/dashboard/dashboard.module#DashboardModule'
},{
  path: 'play',
  loadChildren: 'app/routes/play/play.module#PlayModule'
},{
  path: 'hero',
  loadChildren: 'app/routes/heroes/heroes.module#HeroesModule'
},{
  path: 'partidas',
  loadChildren: 'app/routes/partidas/partidas.module#PartidasModule'
}  
];
