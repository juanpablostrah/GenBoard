import { Player } from 'app/routes/player/player';
import { Actor } from '../actor/actor';

export class Partida  {

	id : number;
	name : String;
	since : Date;
	owner : Player;
	guests : Player[];
  actors : Actor[];
}
