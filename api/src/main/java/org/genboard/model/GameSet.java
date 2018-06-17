package org.genboard.model;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.validator.constraints.Range;

@Entity
public class GameSet {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Long id;
    
    @NotNull
    @Size(min = 3, max=50)
    private String name;

    @NotNull
    @Size(min = 5, max=500)
    private String history;
    
	@Temporal(javax.persistence.TemporalType.DATE)
    private Date since = new Date(System.currentTimeMillis());
    
    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name="owner_id")
    private Player owner;
   
    @ManyToMany(mappedBy="guestGameSet")
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Player> guests = new LinkedList<Player>();
    
    @OneToMany(mappedBy = "gameSet")
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Actor> actors;
    
    @OneToMany(mappedBy = "gameSet")
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Actor> dmActors;
    
    @OneToOne
    private GameSetStatus gameSetStatus;
    
    @Range(min = 2,max = 20)
    private Integer cantPlayersMax;
    
    @OneToOne
    private Initiative initiative;
    
//    @OneToMany(mappedBy = "gameSet", targetEntity = Token.class)
//    private List<Token> tokens;
    
    //private List<Lob> maps;
    
    public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getSince() {
		return since;
	}

	public void setSince(Date since) {
		this.since = since;
	}

	public Player getOwner() {
		return owner;
	}

	public void setOwner(Player owner) {
		this.owner = owner;
	}

	public List<Player> getGuests() {
		return guests;
	}

	public void setGuests(List<Player> guests) {
		this.guests = guests;
	}

	public String getHistory() {
		return history;
	}

	public void setHistory(String history) {
		this.history = history;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<Actor> getActors() {
		return actors;
	}

	public void setActors(List<Actor> actors) {
		this.actors = actors;
	}

	public GameSetStatus getGameSetStatus() {
		return gameSetStatus;
	}

	public void setGameSetStatus(GameSetStatus gameSetStatus) {
		this.gameSetStatus = gameSetStatus;
	}

	public Integer getCantPlayersMax() {
		return cantPlayersMax;
	}

	public void setCantPlayersMax(Integer cantPlayersMax) {
		this.cantPlayersMax = cantPlayersMax;
	}

	public Initiative getInitiative() {
		return initiative;
	}

	public void setInitiative(Initiative initiative) {
		this.initiative = initiative;
	}
	
	
	

//	public List<Token> getTokens() {
//		return tokens;
//	}
//
//	public void setTokens(List<Token> tokens) {
//		this.tokens = tokens;
//	}
//	
	
	

}