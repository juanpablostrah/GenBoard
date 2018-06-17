package org.genboard.websocket.flow;

import java.io.IOException;
import java.util.Iterator;
import java.util.Set;

import org.assertj.core.groups.Tuple;
import org.genboard.model.GameSet;
import org.genboard.model.Initiative;
import org.genboard.model.Throw;
import org.genboard.repository.GameSetRepository;
import org.genboard.websocket.PartidaSocket;
import org.genboard.websocket.dto.InitiativeDTO;
import org.genboard.websocket.dto.InitiativeResponseDTO;
import org.genboard.websocket.message.IncomingMessage;
import org.genboard.websocket.message.OutcomingMessage;
import org.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import liquibase.sqlgenerator.core.GetViewDefinitionGeneratorInformix;

@Component
public class InitiativeResponseSocketFlowHandler extends SocketFlowHandler {

	private static final Logger LOGGER = LoggerFactory.getLogger(SocketFlowHandler.class);
	
	@Autowired
    private GameSetRepository gameSetRepository;
	
	@Override
	public void handle(IncomingMessage messageDTO, PartidaSocket partidaSocket) throws JSONException {
		Set<WebSocketSession> sessions = partidaSocket.getSessions();
		InitiativeResponseDTO initiativeResponseDTO = messageDTO.marshallize(InitiativeResponseDTO.class);
		Iterator<WebSocketSession> iteratorS = sessions.iterator();
		WebSocketSession s = iteratorS.next();
		Long partidaId = (Long) s.getAttributes().get("partidaId");
		
		GameSet partida = gameSetRepository.getOne(partidaId);		
		
		//update Initiative 
		Initiative initiative = partida.getInitiative();
			
		Integer turnCurrent = initiative.getTurn();
		Throw throw2 = initiative.getInitiativeThrow().get(turnCurrent);
		throw2.setActorId(initiativeResponseDTO.getActorId());
		throw2.setResult(initiativeResponseDTO.getResult());
		initiative.getInitiativeThrow().add(throw2);
		
		Integer newTurn = turnCurrent ++;
		initiative.setTurn(newTurn);
		partida.setInitiative(initiative);
		Integer nextActor = initiative.getInitiativeThrow().get(newTurn).getActorId();
		
		//pregunto si es el ultimo actor de la lista para ordenarlos
		if(initiative.getTurn() == initiative.getInitiativeThrow().size()) {
			initiative.order();
			
			OutcomingMessage<InitiativeResponseDTO> broadcast = new OutcomingMessage<InitiativeResponseDTO>("INITIATIVE_RESPONSE");
			
			TextMessage broadcastMessage = broadcast.textMessage(initiativeResponseDTO);		
			for (WebSocketSession session : sessions) {
				try {
					session.sendMessage(broadcastMessage);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			//sino le pido la tirada al siguiente
		}else {
			InitiativeDTO initiativeDTO = messageDTO.marshallize(InitiativeDTO.class);
			Iterator<WebSocketSession> iterator = sessions.iterator();
			while(iterator.hasNext()) {
				WebSocketSession currentSession = iterator.next();
				Integer sessionActorId = (Integer) currentSession.getAttributes().get("actorId");
				if(sessionActorId == newTurn) {
					OutcomingMessage<InitiativeDTO> broadcast = new OutcomingMessage<InitiativeDTO>("INITIATIVE_RESPONSE");
					TextMessage broadcastMessage = broadcast.textMessage(initiativeDTO);
					try {
						currentSession.sendMessage(broadcastMessage);
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		}
		gameSetRepository.save(partida);
		
		
//		Iterator<WebSocketSession> iterator = sessions.iterator();
//		while(iterator.hasNext()) {
//			WebSocketSession currentSession = iterator.next();
//			Integer sessionActorId = (Integer) currentSession.getAttributes().get("actorId");
//			Long longSessionActorId  = new Long(sessionActorId);
//			if(longSessionActorId == actorId) {
//				OutcomingMessage<InitiativeResponseDTO> broadcast = new OutcomingMessage<InitiativeResponseDTO>("INITIATIVE_RESPONSE");
//				TextMessage broadcastMessage = broadcast.textMessage(initiativeDTO);
//				try {
//					currentSession.sendMessage(broadcastMessage);
//				} catch (IOException e) {
//					e.printStackTrace();
//				}
//			}
//		}
//		LOGGER.info("tirando iniciativa ");		

	}

}


