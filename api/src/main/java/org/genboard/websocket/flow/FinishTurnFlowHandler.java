package org.genboard.websocket.flow;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import org.genboard.model.Actor;
import org.genboard.model.GameSet;
import org.genboard.model.Initiative;
import org.genboard.model.Throw;
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
public class FinishTurnFlowHandler extends SocketFlowHandler{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(SocketFlowHandler.class);

	@Autowired
    private GameSetRepository gameSetRepository;
	
	@Autowired
    private InitiativeRepository initiativeRepository;
	
	@Override
	public void handle(IncomingMessage messageDTO, GameSetSocket partidaSocket) throws JSONException {
		
		DefaultActionDTO finishDTO = messageDTO.marshallize(DefaultActionDTO.class);
		Long partidaId = partidaSocket.getGameSetId();		
		
		GameSet partida = gameSetRepository.findById(partidaId).get();
		Initiative initiative = partida.getInitiative();
		//Long currentActorId = initiative.currentThrow().getActor().getId();		
		//initiative.nextTurn();
		
		initiative.nextTurn();
		Throw nextThrow = initiative.currentThrow();
		Actor nextActor = nextThrow.getActor();
		Long nextActorId = nextActor.getId();
		
		initiativeRepository.save(initiative);
		//TENGO QUE PEDIR EL TURNO DEL SIGUIENTE ACTOR A TIRAR
		//Long currentActorId = initiative.getActors().get(initiative.getTurn());
		WebSocketSession nextTurnSession = partidaSocket.findByActorId(nextActorId);
		
		if(nextTurnSession == null) {
			List<Actor> actors = partida.getActors();
			for (Actor actor : actors) {
				if(actor.getDm()) {
					nextActorId = actor.getId();
					break;
				}
			}
			nextTurnSession = partidaSocket.findByActorId(nextActorId);
		}
		finishDTO.setActorId(initiative.getActors().get(initiative.getTurn()));
		
		OutcomingMessage<DefaultActionDTO> broadcast = new OutcomingMessage<DefaultActionDTO>("FINISH_TURN_RESPONSE");
		TextMessage broadcastMessage = broadcast.textMessage(finishDTO);
		try {
			nextTurnSession.sendMessage(broadcastMessage);
		} catch (IOException e) {
			e.printStackTrace();
		}
		LOGGER.info("Finalizo turno");
		
//		Set<WebSocketSession> sessions = partidaSocket.getSessions();
//		OutcomingMessage<DefaultActionDTO> broadcast3 = new OutcomingMessage<DefaultActionDTO>("CURRENT_ACTOR_RESPONSE");
//		TextMessage broadcastToRest = broadcast3.textMessage(finishDTO);
//		
//		for (WebSocketSession session : sessions) {
//			if(session != nextTurnSession) {
//				try {
//					session.sendMessage(broadcastToRest);
//				} catch (IOException e) {
//					e.printStackTrace();
//				}
//			}
//			
//		}
	}

}
