package org.genboard.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Throw {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Long id;
	
	private Integer actorId;
	
	private Integer result;
	
	@ManyToOne
    private Initiative initiative;
	
	public Throw() {
		super();
	}
	
	
	public Throw(Integer actorId, Integer result) {
		super();
		this.actorId = actorId;
		this.result = result;
	}

	public Integer getActorId() {
		return actorId;
	}
	public void setActorId(Integer actorId) {
		this.actorId = actorId;
	}
	public Integer getResult() {
		return result;
	}
	public void setResult(Integer result) {
		this.result = result;
	}


	public Initiative getInitiative() {
		return initiative;
	}
	
	public void setInitiative(Initiative initiative) {
		this.initiative = initiative;
	}
	
	
	

}
