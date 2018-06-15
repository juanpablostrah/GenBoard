package org.genboard.websocket;

import java.util.HashMap;
import java.util.Map;

import org.genboard.websocket.flow.RollSocketFlowHandler;
import org.genboard.websocket.flow.SocketFlowHandler;
import org.genboard.websocket.message.IncomingMessage;
import org.json.JSONException;
import org.springframework.stereotype.Component;

@Component
public class GameSetSocketFlowHandler {
	

	private Map<String, SocketFlowHandler> handlers = new HashMap<String, SocketFlowHandler>();
	
	public GameSetSocketFlowHandler() {
		//se subscribe por cada tag de mensaje una instancia de su handlder
		handlers.put("ROLL_REQUEST", new RollSocketFlowHandler());
		handlers.put("INITIATIVE", new InitiativeSocketFlowHandler());
		handlers.put("CHAT_REQUEST", new ChatSocketFlowHandler());
		handlers.put("MOVE_TOKEN_REQUEST", new MoveTokenSocketFlowHandler());
	
	}


	public void handle(IncomingMessage messageDTO, PartidaSocket partidaSocket) throws JSONException {
		String tag = messageDTO.getTag();
		SocketFlowHandler handler = handlers.get(tag);
		handler.handle(messageDTO, partidaSocket);
	}

}
