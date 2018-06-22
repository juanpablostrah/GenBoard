package org.genboard.websocket.dto;

import org.genboard.model.Coord;

public class TokenRequestDTO {

	private Integer actorId;
	private Coord coord;
	
	public Integer getActorId() {
		return actorId;
	}
	public void setActorId(Integer actorId) {
		this.actorId = actorId;
	}
	public Coord getCoord() {
		return coord;
	}
	public void setCoord(Coord coord) {
		this.coord = coord;
	}
	
}
