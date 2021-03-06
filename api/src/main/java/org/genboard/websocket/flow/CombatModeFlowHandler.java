package org.genboard.websocket.flow;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import org.genboard.model.Actor;
import org.genboard.model.GameSet;
import org.genboard.model.Initiative;
import org.genboard.repository.GameSetRepository;
import org.genboard.repository.InitiativeRepository;
import org.genboard.websocket.GameSetSocket;
import org.genboard.websocket.dto.DefaultActionDTO;
import org.genboard.websocket.message.IncomingMessage;
import org.genboard.websocket.message.OutcomingMessage;
import org.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@Component
public class CombatModeFlowHandler extends SocketFlowHandler{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(SocketFlowHandler.class);

	@Autowired
    private GameSetRepository gameSetRepository;
	
	@Autowired
    private InitiativeRepository initiativeRepository;
	
	@Override
	public void handle(IncomingMessage messageDTO, GameSetSocket partidaSocket) throws JSONException {
		
		DefaultActionDTO combatDTO = messageDTO.marshallize(DefaultActionDTO.class);
		Long partidaId = partidaSocket.getGameSetId();		
		
		GameSet partida = gameSetRepository.findById(partidaId).get();
		Initiative initiative = partida.getInitiative();
//		Long currentActorId = initiative.currentThrow().getActor().getId();
		//obtengo el primer actor de la lista de actores ordenados de la Iniciativa 
		//Long currentActorId = initiative.findByActorId(combatDTO.getActorId()).get;
		//Long currentActorId = initiative.getActors().get(0);
		Long currentActorId = combatDTO.getActorId();
		initiativeRepository.save(initiative);
		WebSocketSession nextTurnSession = partidaSocket.findByActorId(currentActorId);
		
		if(nextTurnSession == null) {
			List<Actor> actors = partida.getActors();
			for (Actor actor : actors) {
				if(actor.getDm()) {
					currentActorId = actor.getId();
					break;
				}
			}
			nextTurnSession = partidaSocket.findByActorId(currentActorId);
		}
		
		OutcomingMessage<DefaultActionDTO> broadcast = new OutcomingMessage<DefaultActionDTO>("COMBAT_RESPONSE");
		TextMessage broadcastMessage = broadcast.textMessage(combatDTO);
		try {
			nextTurnSession.sendMessage(broadcastMessage);
		} catch (IOException e) {
			e.printStackTrace();
		}
		LOGGER.info("es tu turno");
		
		Set<WebSocketSession> sessions = partidaSocket.getSessions();
		OutcomingMessage<DefaultActionDTO> broadcast3 = new OutcomingMessage<DefaultActionDTO>("CURRENT_ACTOR_RESPONSE");
		TextMessage broadcastToRest = broadcast3.textMessage(combatDTO);
		
		for (WebSocketSession session : sessions) {
			if(session != nextTurnSession) {
				try {
					session.sendMessage(broadcastToRest);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			
		}
	}

}
