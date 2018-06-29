package org.genboard.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Actor {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Long id;
    
	@NotNull
	@Enumerated(value = EnumType.STRING)
	private ActorType tipoActor;
	
	@NotNull
    @Size(min = 3, max=50)
    private String name;
	
	@ManyToOne
    private Player player;
	
    private int life;
    
    private String damage;
    
    @ManyToOne
    private GameSet gameSet;
    
    @OneToOne
    private Token token;
    
    private int ultimaIniciativa;
    
    private Boolean dm;
    
	@Temporal(javax.persistence.TemporalType.DATE)
    private Date since = new Date(System.currentTimeMillis());

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ActorType getTipoActor() {
		return tipoActor;
	}

	public void setTipoActor(ActorType tipoActor) {
		this.tipoActor = tipoActor;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getLife() {
		return life;
	}

	public void setLife(int life) {
		this.life = life;
	}

	public String getDamage() {
		return damage;
	}

	public void setDamage(String damage) {
		this.damage = damage;
	}

	public GameSet getGameSet() {
		return gameSet;
	}

	public void setGameSet(GameSet gameSet) {
		this.gameSet = gameSet;
	}

	public Date getSince() {
		return since;
	}

	public void setSince(Date since) {
		this.since = since;
	}

	public Player getPlayer() {
		return player;
	}

	public void setPlayer(Player player) {
		this.player = player;
	}

	public int getUltimaIniciativa() {
		return ultimaIniciativa;
	}

	public void setUltimaIniciativa(int ultimaIniciativa) {
		this.ultimaIniciativa = ultimaIniciativa;
	}

	public Token getToken() {
		return token;
	}

	public void setToken(Token token) {
		this.token = token;
	}

	public Boolean getDm() {
		return dm;
	}

	public void setDm(Boolean dm) {
		this.dm = dm;
	}
	
	
	
    
}
