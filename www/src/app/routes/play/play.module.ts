import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PlayComponent } from './play.component';
import { PlayRoutingModule } from './play-routing.module';
import { RollerControlComponent } from './roller-control/roller-control.component';
import { CanvasDiceRollComponent } from './canvas-dice-roll/canvas-dice-roll.component';
import { GameLogComponent } from './game-log/game-log.component';
import { CurrentGameComponent } from './current-game/current-game.component';

@NgModule({
  imports: [
    TranslateModule,
    PlayRoutingModule,
    RollerControlComponent,
    CanvasDiceRollComponent,
    GameLogComponent,
    CurrentGameComponent,
  ],
  exports: [

  ],
  declarations: [
    PlayComponent
  ],
  providers: [

  ]
})
export class PlayModule {

}
