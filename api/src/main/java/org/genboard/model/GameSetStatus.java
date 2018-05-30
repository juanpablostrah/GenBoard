package org.genboard.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class GameSetStatus {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Long id;
	
	@OneToOne
    private GameSet gameSet;

	@OneToMany
    private List<Initiative> initiative;

	@Enumerated(value = EnumType.STRING)
	private StateType stateType;
    
	public GameSetStatus() {
		super();
	}

	public GameSet getGameSet() {
		return gameSet;
	}

	public void setGameSet(GameSet gameSet) {
		this.gameSet = gameSet;
	}

	public List<Initiative> getInitiative() {
		return initiative;
	}

	public void setInitiative(List<Initiative> initiative) {
		this.initiative = initiative;
	}

	public StateType getStateType() {
		return stateType;
	}

	public void setStateType(StateType stateType) {
		this.stateType = stateType;
	}
	
    
}
