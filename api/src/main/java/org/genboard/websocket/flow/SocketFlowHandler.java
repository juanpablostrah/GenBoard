package org.genboard.websocket.flow;

import org.genboard.websocket.PartidaSocket;
import org.genboard.websocket.message.IncomingMessage;

public abstract class SocketFlowHandler {

	public abstract void handle(IncomingMessage messageDTO, PartidaSocket partidaSocket);

}
