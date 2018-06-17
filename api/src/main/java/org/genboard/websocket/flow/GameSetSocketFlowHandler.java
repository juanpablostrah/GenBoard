package org.genboard.websocket.flow;

import java.util.HashMap;
import java.util.Map;

import org.genboard.repository.GameSetRepository;
import org.genboard.websocket.PartidaSocket;
import org.genboard.websocket.message.IncomingMessage;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GameSetSocketFlowHandler {
	
	
	private Map<String, SocketFlowHandler> handlers = new HashMap<String, SocketFlowHandler>();
	
	@Autowired
	private InitiativeSocketFlowHandler initiativeSocketFlowHandler;
	
	@Autowired 
	private InitiativeResponseSocketFlowHandler initiativeResponseSocketFlowHandler;
	
	@Autowired
	private RollSocketFlowHandler rollSocketFlowHandler;
	
	@Autowired
	private ChatSocketFlowHandler chatSocketFlowHandler;
	
	@Autowired
	private MoveTokenSocketFlowHandler moveTokenSocketFlowHandler;
	
	
	public GameSetSocketFlowHandler() {
		//se subscribe por cada tag de mensaje una instancia de su handlder
		handlers.put("ROLL_REQUEST", rollSocketFlowHandler);
		handlers.put("INITIATIVE_REQUEST", initiativeSocketFlowHandler);
		handlers.put("INITIATIVE_RESPONSE", initiativeResponseSocketFlowHandler);
		handlers.put("CHAT_REQUEST",chatSocketFlowHandler);
		handlers.put("MOVE_TOKEN_REQUEST", moveTokenSocketFlowHandler);
	}

	public void handle(IncomingMessage messageDTO, PartidaSocket partidaSocket) throws JSONException {
		String tag = messageDTO.getTag();
		SocketFlowHandler handler = handlers.get(tag);
		handler.handle(messageDTO, partidaSocket);
	}

}
