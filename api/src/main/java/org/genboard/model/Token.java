package org.genboard.model;

import java.sql.Blob;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

//@Entity
public class Token {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Long id;
	
	@NotNull
    @Size(min = 3, max=50)
	private String name;
	
	@Lob
	private Blob image;
	
	@OneToOne
    @JsonIgnore
    @JoinColumn(name="user_account_username")
	private Coord coord;
	
    @ManyToOne
    private GameSet gameSet;
    

	public Token() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Blob getImage() {
		return image;
	}

	public void setImage(Blob image) {
		this.image = image;
	}

	public GameSet getGameSet() {
		return gameSet;
	}

	public void setGameSet(GameSet gameSet) {
		this.gameSet = gameSet;
	}
    
    

}
