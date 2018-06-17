package org.genboard.websocket.dto;

import java.util.List;

import org.genboard.model.Throw;

public class InitiativeResponseDTO {
	
	private Integer actorId;
	private Integer result;
	private List<Throw> throwResults;
	
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
	
	

}
