import { Partida } from '../partidas/partida';
import { PlayerState } from '../player/player-state';

export class Player  {
	
	id              : number;
	//userAccount     : UserAccount;
  fullName        : String;
	since           : Date;
  address         : String;
  email           : String;
  mobilePhone     : String;
  homePhone       : String;
  birthday        : Date;
	ownGameSet      : Partida[];
  guestGameSet    : Partida[];
  playerState     : PlayerState;
  disablingReason : String;

}
