import { ActorType } from '../actor/actorType'
import { Player } from "../player/player";
import { Partida } from 'app/services/partidas/partida.model';

export class Actor {

  id?: number;
  tipoActor : ActorType;
  name: string;
  life: number;
  damage: string;
  player: Player;
  partida: Partida;
  ultimaIniciativa : number;
}
