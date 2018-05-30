package org.genboard.model;

import java.util.List;

public class CombatMode extends GameSetState{

	@Override
	public void throwDie(List<Dice> die, Actor actor) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void finishTurn(Actor actor) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void startInitiativeMode(GameSetStatus gameSetStatus) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void startHistoryMode(GameSetStatus gameSetStatus) {
		gameSetStatus.setStateType(StateType.HISTORY);
		
	}

	@Override
	public void startCheckMode(GameSetStatus gameSetStatus) {
		gameSetStatus.setStateType(StateType.CHECK);
		
	}

}
