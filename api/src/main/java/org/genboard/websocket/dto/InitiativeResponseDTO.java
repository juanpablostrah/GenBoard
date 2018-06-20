package org.genboard.websocket.dto;

import java.util.List;

import org.genboard.model.Throw;

public class InitiativeResponseDTO {
	
	private Integer actorId;
	private Integer partidaId;
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
	public List<Throw> getThrowResults() {
		return throwResults;
	}
	public void setThrowResults(List<Throw> throwResults) {
		this.throwResults = throwResults;
	}
	public Integer getPartidaId() {
		return partidaId;
	}
	public void setPartidaId(Integer partidaId) {
		this.partidaId = partidaId;
	}
	
	

}
