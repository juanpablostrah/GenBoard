package org.genboard.websocket.flow;

import java.io.IOException;

import org.genboard.model.Actor;
import org.genboard.model.GameSet;
import org.genboard.model.Initiative;
import org.genboard.model.Throw;
import org.genboard.repository.GameSetRepository;
import org.genboard.repository.InitiativeRepository;
import org.genboard.repository.ThrowRepository;
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
public class InitiativeSocketFlowHandler extends SocketFlowHandler {
	
	@Autowired
    private GameSetRepository gameSetRepository;
	
	@Autowired
    private InitiativeRepository initiativeRepository;
    
	@Autowired
    private ThrowRepository throwRepository;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(SocketFlowHandler.class);
	
	@Override
	public void handle(IncomingMessage messageDTO, GameSetSocket partidaSocket) throws JSONException {
		DefaultActionDTO initiativeDTO = messageDTO.marshallize(DefaultActionDTO.class);
		Long partidaId = partidaSocket.getGameSetId();		
		GameSet partida = gameSetRepository.findById(partidaId).get();
		Initiative initiative = partida.getInitiative();
		initiative.setTurn(0);
		initiativeRepository.save(initiative);
		for(Throw oldThrow : initiative.getInitiativeThrow()) {
			throwRepository.delete(oldThrow);
		}
		for(Actor actor : partida.getActors()) {
			Throw initiativeThrow = new Throw(actor, 0);
			initiativeThrow.setInitiative(initiative);
			throwRepository.save(initiativeThrow);
		}
		Actor nextTurnActor = partida.getActors().get(0);
		WebSocketSession nextTurnSession = partidaSocket.findByActorId(nextTurnActor.getId());
		OutcomingMessage<DefaultActionDTO> broadcast = new OutcomingMessage<DefaultActionDTO>("INITIATIVE_RESPONSE");
		TextMessage broadcastMessage = broadcast.textMessage(initiativeDTO);
		try {
			nextTurnSession.sendMessage(broadcastMessage);
		} catch (IOException e) {
			e.printStackTrace();
		}
		LOGGER.info("tirando iniciativa ");		

	}
	

}
