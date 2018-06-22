package org.genboard.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Coord {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Long id;
	
	private Double x;
	
	private Double z;

	
	public Coord() {
		super();
	}

	public Coord(Double x, Double z) {
		super();
		this.x = x;
		this.z = z;
	}

	public Double getX() {
		return x;
	}


	public void setX(Double x) {
		this.x = x;
	}


	public Double getZ() {
		return z;
	}


	public void setZ(Double z) {
		this.z = z;
	}

	
	

}
