import { Player } from '../player/player'

export class Partida  {
  
	id : number;
	name : String;
	since : Date;
	owner : Player;
	guests : Player[];
}
