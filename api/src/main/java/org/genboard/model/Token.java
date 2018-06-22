package org.genboard.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class Token {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Long id;
	
	//private String name;
	
//	@Lob
//	private Blob image;
	
	@OneToOne
	private Coord coord;
	
    @ManyToOne
    private GameSet gameSet;
    
    @OneToOne
    private Actor actor;
    
	public Token() {
		super();
	}

	public Token(Coord coord) {
		super();
		this.coord = coord;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public GameSet getGameSet() {
		return gameSet;
	}

	public void setGameSet(GameSet gameSet) {
		this.gameSet = gameSet;
	}

	public Coord getCoord() {
		return coord;
	}

	public void setCoord(Coord coord) {
		this.coord = coord;
	}

	public Actor getActor() {
		return actor;
	}

	public void setActor(Actor actor) {
		this.actor = actor;
	}
    
	
    

}
