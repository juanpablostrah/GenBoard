package org.genboard.websocket;

import java.util.HashSet;
import java.util.Set;

public class PartidaSocket<T> {
	
	private Set<T> sessions;
	
	public PartidaSocket() {
		this.sessions = new HashSet<T>();
	}
	
	public void addSession(T session) {
		sessions.add(session);
	}

	public Set<T> getSessions() {
		return sessions;
	}
	
	
}
