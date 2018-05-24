package org.genboard.model;

import java.util.List;

public abstract class GameSetState {

	public abstract void throwDie(List<Dice> die, Actor actor);
	
	public abstract void finishTurn(Actor actor);
	
	public abstract void startInitiativeMode();
	
	public abstract void startHistoryMode();
	
	public abstract void startCheckMode();
	
	
}
