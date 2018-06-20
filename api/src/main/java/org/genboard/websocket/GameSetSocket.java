package org.genboard.websocket;

import java.util.HashSet;
import java.util.Set;

import org.springframework.web.socket.WebSocketSession;

public class GameSetSocket {
	
	private Set<WebSocketSession> sessions;
	
	private Long gameSetId;
	
	public Long getGameSetId() {
		return gameSetId;
	}

	public GameSetSocket(Long gameSetId) {
		this.gameSetId = gameSetId;
		this.sessions = new HashSet<WebSocketSession>();
	}
	
	public void addSession(WebSocketSession session) {
		sessions.add(session);
	}

	public Set<WebSocketSession> getSessions() {
		return sessions;
	}
	
	public WebSocketSession findByActorId(Long actorId) {
		for (WebSocketSession session : sessions) {
			Long sessionActorId = (Long) session.getAttributes().get("actorId");
			if(actorId.equals(sessionActorId)) {
				return session;
			}
		}
		return null;
	}
}
