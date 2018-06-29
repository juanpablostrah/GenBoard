package org.genboard.websocket;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.genboard.websocket.flow.ChatSocketFlowHandler;
import org.genboard.websocket.flow.CombatModeFlowHandler;
import org.genboard.websocket.flow.HistoryModeSocketFlowHandler;
import org.genboard.websocket.flow.InitiativeResponseSocketFlowHandler;
import org.genboard.websocket.flow.InitiativeSocketFlowHandler;
import org.genboard.websocket.flow.MoveTokenSocketFlowHandler;
import org.genboard.websocket.flow.RollSocketFlowHandler;
import org.genboard.websocket.flow.SocketFlowHandler;
import org.genboard.websocket.message.IncomingMessage;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GameSetSocketFlowManager {
	
	
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
	
	@Autowired
	private CombatModeFlowHandler combatModeFlowHandler;
	
	@Autowired
	private HistoryModeSocketFlowHandler historyModeSocketFlowHandler;
	
	
	@PostConstruct
	public void initialize() {
		//se subscribe por cada tag de mensaje una instancia de su handler
		handlers.put("ROLL_REQUEST", rollSocketFlowHandler);
		handlers.put("INITIATIVE_REQUEST", initiativeSocketFlowHandler);
		handlers.put("THROW_INITIATIVE", initiativeResponseSocketFlowHandler);
		handlers.put("CHAT_REQUEST",chatSocketFlowHandler);
		handlers.put("MOVE_TOKEN_REQUEST", moveTokenSocketFlowHandler);
		handlers.put("COMBAT_MODE_REQUEST", combatModeFlowHandler);
		handlers.put("HISTORY_MODE_REQUEST", historyModeSocketFlowHandler);
	}

	public void handle(IncomingMessage messageDTO, GameSetSocket partidaSocket) throws JSONException {
		String tag = messageDTO.getTag();
		SocketFlowHandler handler = handlers.get(tag);
		handler.handle(messageDTO, partidaSocket);
	}
	
}
