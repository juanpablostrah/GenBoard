import { NgModule } from '@angular/core';
import { HeroService } from './hero/hero.service';
import { AuthService } from './auth/auth.service';
import { PartidasService } from './partidas/partidas.service';
import { PartidasSocketService } from './partidas/partidas-socket.service';
import { ActorService } from './actor/actor.service';
import { PlayerService } from './player/player.service';
import { WebSocketService } from './webSocket/webSocket.service';

@NgModule({
  imports: [
  ],
  exports: [
  ],
  providers: [
    HeroService,
    AuthService,
    PartidasService,
    ActorService,
    WebSocketService,
    PartidasSocketService,
    PlayerService
  ]
})
export class ServicesModule {

}
