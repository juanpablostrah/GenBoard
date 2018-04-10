import { Routes } from '@angular/router';
import { PartidasComponent } from './partidas.component';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

export const partidasRoutes: Routes = [{
  path: '',
  component: PartidasComponent,
  children: [
    { path: '', component: IndexComponent },
    { path: 'create', component: CreateComponent },
    { path: 'edit/:partidaId', component: EditComponent }
  ]
}];
