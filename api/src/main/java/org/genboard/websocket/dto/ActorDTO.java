package org.genboard.websocket.dto;

import org.genboard.model.Actor;

public class ActorDTO {
	
	private String name;
	
	private Long actorId;
	
	//private Player player; //esto se que es lo que no tengo que hacer..
	
	
	
	public ActorDTO buildActor(Actor actor) {
		ActorDTO actorDTO = new ActorDTO();
		actorDTO.setName(actor.getName());
		actorDTO.setId(actor.getId());
		
		return actorDTO;
	}


	public void setId(Long id) {
		this.actorId = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	
}
