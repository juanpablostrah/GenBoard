package org.genboard.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class Throw {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Long id;
		
    @OneToOne
	private Actor actor;
	
	private Integer result;
	
	@ManyToOne
    private Initiative initiative;
	
	public Throw() {
		super();
	}
	
	
	public Throw(Actor actor, Integer result) {
		super();
		this.actor = actor;
		this.result = result;
	}
	
	
	
	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public Actor getActor() {
		return actor;
	}


	public void setActor(Actor actor) {
		this.actor = actor;
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
