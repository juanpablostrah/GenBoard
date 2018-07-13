import { NgModule } from '@angular/core';
import { HeroService } from './hero/hero.service';
import { AuthService } from './auth/auth.service';
import { PartidasService } from './partidas/partidas.service';
import { PartidasSocketService } from './partidas/partidas-socket.service';
import { ActorService } from './actor/actor.service';
import { PlayerService } from './player/player.service';
import { WebSocketService } from './webSocket/webSocket.service';
import { MapaService } from './mapa/mapa.service.component';

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
    PlayerService,
    MapaService
  ],
  declarations: []
})
export class ServicesModule {

}
