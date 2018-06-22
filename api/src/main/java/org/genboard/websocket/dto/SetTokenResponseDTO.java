package org.genboard.websocket.dto;

import java.util.List;

import org.genboard.model.Token;

public class SetTokenResponseDTO {
	
	public Long actorId;
	public Long gameSetId;
	public List<Token> tokens;
	
	public Long getActorId() {
		return actorId;
	}
	public void setActorId(Long actorId) {
		this.actorId = actorId;
	}
	public Long getGameSetId() {
		return gameSetId;
	}
	public void setGameSetId(Long gameSetId) {
		this.gameSetId = gameSetId;
	}
	public List<Token> getTokens() {
		return tokens;
	}
	public void setTokens(List<Token> tokens) {
		this.tokens = tokens;
	}
	
	

	
	
}
