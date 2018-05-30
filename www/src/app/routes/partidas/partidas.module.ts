import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CreateActorComponent } from './create-actor/create-actor.component';


@NgModule({
  imports: [
    CommonModule,
    PartidasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
    PlayersComponent,
    CreateActorComponent
  ],
  entryComponents: [],
  providers: []
})
export class PartidasModule {}
