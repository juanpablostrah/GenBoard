package org.genboard.model;

import java.util.List;

public abstract class GameSetState {

	public abstract void throwDie(List<Dice> die, Actor actor);
	
	public abstract void finishTurn(Actor actor);
	
	public abstract void startInitiativeMode(GameSetStatus gameSetStatus);
	
	public abstract void startHistoryMode(GameSetStatus gameSetStatus);
	
	public abstract void startCheckMode(GameSetStatus gameSetStatus);
	
	
}
