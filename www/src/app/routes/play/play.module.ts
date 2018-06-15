import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PlayComponent } from './play.component';
import { PlayRoutingModule } from './play-routing.module';
import { RollerControlComponent } from './roller-control/roller-control.component';
import { CanvasDiceRollComponent } from './canvas-dice-roll/canvas-dice-roll.component';
import { GameLogComponent } from './game-log/game-log.component';
import { CurrentGameComponent } from './current-game/current-game.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from 'app/shared/modules/material.module';
import { MapsControlComponent } from './maps-control/maps-control.component';
import { MapComponent } from './map/map.component';
import { DmPanelComponent } from './dm-panel/dm-panel.component';
import { DmDialogComponent } from './dm-dialog/dm-dialog.component';
import { ActorListComponent } from './actor-list/actor-list.component';
import { MatChipsModule } from '@angular/material/chips';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';


@NgModule({
  imports: [
    TranslateModule,
    PlayRoutingModule,
    FlexLayoutModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    MatChipsModule,
    DragulaModule

  ],
  exports: [

  ],
  declarations: [
    RollerControlComponent,
    CanvasDiceRollComponent,
    CurrentGameComponent,
    GameLogComponent,
    PlayComponent,
    MapsControlComponent,
    MapComponent,
    DmPanelComponent,
    DmDialogComponent,
    ActorListComponent
  ],
  providers: [

  ],
  entryComponents: [DmDialogComponent]
})
export class PlayModule {

}
