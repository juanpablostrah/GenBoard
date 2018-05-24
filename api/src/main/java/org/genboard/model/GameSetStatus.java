package org.genboard.model;

import java.util.List;

import javax.persistence.Entity;
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

	@OneToOne
	private GameSetState gameState;
    
	public GameSetStatus() {
		super();
	}

	public GameSet getGameSet() {
		return gameSet;
	}

	public void setGameSet(GameSet gameSet) {
		this.gameSet = gameSet;
	}

	public List<Initiative> getIniciative() {
		return initiative;
	}

	public void setIniciative(List<Initiative> initiative) {
		this.initiative = initiative;
	}

	public List<Initiative> getInitiative() {
		return initiative;
	}

	public void setInitiative(List<Initiative> initiative) {
		this.initiative = initiative;
	}

	public GameSetState getGameState() {
		return gameState;
	}

	public void setGameState(GameSetState gameState) {
		this.gameState = gameState;
	}

    
    
}
