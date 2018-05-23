package org.genboard.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Initiative {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Long id;
	
	@OneToOne
	private Actor actor;
	
	private int actualInitiative;

	private Boolean canPLay;
	
	public Initiative() {
		super();
	}

	public Actor getActor() {
		return actor;
	}

	public void setActor(Actor actor) {
		this.actor = actor;
	}

	public int getActualInitiative() {
		return actualInitiative;
	}

	public void setActualInitiative(int actualInitiative) {
		this.actualInitiative = actualInitiative;
	}

	public Boolean getCanPLay() {
		return canPLay;
	}

	public void setCanPLay(Boolean canPLay) {
		this.canPLay = canPLay;
	}
	
	
	

}
