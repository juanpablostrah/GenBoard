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
    
    
}
