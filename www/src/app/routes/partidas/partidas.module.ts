import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PartidasRoutingModule } from './partidas-routing.module';
import { PartidasComponent } from './partidas.component';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { FieldsetComponent } from './_partial/fieldset/fieldset.component';
import { DatosPartidaComponent } from './_partial/datos-partida/datos-partida.component';
import { PlayersComponent } from './_partial/players/players.component';
import { MaterialModule } from 'app/shared/modules/material.module';
import { FlexLayoutModule } from "@angular/flex-layout";


@NgModule({
  imports: [
    CommonModule,
    PartidasRoutingModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    PartidasComponent,
    IndexComponent,
    CreateComponent,
    EditComponent,
    FieldsetComponent,
    DatosPartidaComponent,
    PlayersComponent
  ],
  entryComponents: [],
  providers: []
})
export class PartidasModule {}
