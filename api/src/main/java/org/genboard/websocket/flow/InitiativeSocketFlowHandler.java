package org.genboard.websocket.flow;

import java.io.IOException;
import java.util.Iterator;
import java.util.Set;

import org.genboard.model.GameSet;
import org.genboard.repository.GameSetRepository;
import org.genboard.websocket.PartidaSocket;
import org.genboard.websocket.dto.InitiativeDTO;
import org.genboard.websocket.message.IncomingMessage;
import org.genboard.websocket.message.OutcomingMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@Component
public class InitiativeSocketFlowHandler extends SocketFlowHandler {
	
	@Autowired
    private GameSetRepository gameSetRepository;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(SocketFlowHandler.class);
	
	@Override
	public void handle(IncomingMessage messageDTO, PartidaSocket partidaSocket) {
		Set<WebSocketSession> sessions = partidaSocket.getSessions();
		InitiativeDTO initiativeDTO = messageDTO.marshallize(InitiativeDTO.class);
		Iterator<WebSocketSession> iteratorS = sessions.iterator();
		WebSocketSession s = iteratorS.next();
		Integer partidaIdInt = (Integer) s.getAttributes().get("partidaId");
		Long partidaId = new Long(partidaIdInt);
		
		GameSet partida = gameSetRepository.findById(partidaId).get();
		Long actorId = partida.getActors().get(0).getId();
		Iterator<WebSocketSession> iterator = sessions.iterator();
		while(iterator.hasNext()) {
			WebSocketSession currentSession = iterator.next();
			Integer sessionActorId = (Integer) currentSession.getAttributes().get("actorId");
			Long longSessionActorId  = new Long(sessionActorId);
			if(longSessionActorId.longValue() == actorId.longValue()) {
				OutcomingMessage<InitiativeDTO> broadcast = new OutcomingMessage<InitiativeDTO>("INITIATIVE_RESPONSE");
				TextMessage broadcastMessage = broadcast.textMessage(initiativeDTO);
				try {
					currentSession.sendMessage(broadcastMessage);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		LOGGER.info("tirando iniciativa ");		

	}

}
