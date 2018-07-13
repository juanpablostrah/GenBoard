package org.genboard.websocket;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.genboard.websocket.flow.ChatSocketFlowHandler;
import org.genboard.websocket.flow.CombatModeFlowHandler;
import org.genboard.websocket.flow.CurrentActorSocketFlowHandler;
import org.genboard.websocket.flow.DeleteCharacterSocketFlowHandler;
import org.genboard.websocket.flow.FinishTurnFlowHandler;
import org.genboard.websocket.flow.HistoryModeSocketFlowHandler;
import org.genboard.websocket.flow.InitiativeResponseSocketFlowHandler;
import org.genboard.websocket.flow.InitiativeSocketFlowHandler;
import org.genboard.websocket.flow.MoveTokenSocketFlowHandler;
import org.genboard.websocket.flow.NewCharacterSocketFlowHandler;
import org.genboard.websocket.flow.RollSocketFlowHandler;
import org.genboard.websocket.flow.SetMapSocketFlowHandler;
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
	
	@Autowired
	private NewCharacterSocketFlowHandler newCharacterSocketFlowHandler ;
	
	@Autowired
	private CurrentActorSocketFlowHandler currentActorSocketFlowHandler;
	
	@Autowired
	private DeleteCharacterSocketFlowHandler deleteCharacterSocketFlowHandler;
	
	@Autowired
	private FinishTurnFlowHandler finishTurnSocketFlowHandler;
	
	@Autowired
	private SetMapSocketFlowHandler setMapSocketFlowHandler;
	
	
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
		handlers.put("HANDLE_NEW_PERSONAJE", newCharacterSocketFlowHandler);
		handlers.put("HANDLE_DELETE_PERSONAJE", deleteCharacterSocketFlowHandler);
		handlers.put("CURRENT_ACTOR", currentActorSocketFlowHandler);
		handlers.put("FINISH_TURN", finishTurnSocketFlowHandler);
		handlers.put("SET_MAP", setMapSocketFlowHandler);
		
	}

	public void handle(IncomingMessage messageDTO, GameSetSocket partidaSocket) throws JSONException {
		String tag = messageDTO.getTag();
		SocketFlowHandler handler = handlers.get(tag);
		handler.handle(messageDTO, partidaSocket);
	}
	
}
