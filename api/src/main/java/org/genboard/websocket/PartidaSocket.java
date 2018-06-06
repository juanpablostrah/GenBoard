package org.genboard.websocket;

import java.util.HashSet;
import java.util.Set;

import org.springframework.web.socket.WebSocketSession;

public class PartidaSocket {
	
	private Set<WebSocketSession> sessions;
	
	public PartidaSocket() {
		this.sessions = new HashSet<WebSocketSession>();
	}
	
	public void addSession(WebSocketSession session) {
		sessions.add(session);
	}

	public Set<WebSocketSession> getSessions() {
		return sessions;
	}
	
}
