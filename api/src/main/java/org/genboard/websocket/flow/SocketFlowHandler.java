package org.genboard.websocket.flow;

import org.genboard.websocket.PartidaSocket;
import org.genboard.websocket.message.IncomingMessage;
import org.json.JSONException;

public abstract class SocketFlowHandler {

	public abstract void handle(IncomingMessage messageDTO, PartidaSocket partidaSocket) throws JSONException;

}
