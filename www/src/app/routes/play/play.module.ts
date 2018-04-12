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

@NgModule({
  imports: [
    TranslateModule,
    PlayRoutingModule,
    FlexLayoutModule,
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [

  ],
  declarations: [
    RollerControlComponent,
    CanvasDiceRollComponent,
    CurrentGameComponent,
    GameLogComponent,
    PlayComponent
  ],
  providers: [

  ]
})
export class PlayModule {

}
