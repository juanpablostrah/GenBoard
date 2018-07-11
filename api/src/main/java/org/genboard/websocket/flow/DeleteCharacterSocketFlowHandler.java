package org.genboard.websocket.flow;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.genboard.model.Actor;
import org.genboard.model.GameSet;
import org.genboard.model.ThrowDice;
import org.genboard.model.Token;
import org.genboard.repository.ActorRepository;
import org.genboard.repository.GameSetRepository;
import org.genboard.websocket.GameSetSocket;
import org.genboard.websocket.dto.ActorDTO;
import org.genboard.websocket.dto.ChatDTO;
import org.genboard.websocket.dto.DefaultActionDTO;
import org.genboard.websocket.message.IncomingMessage;
import org.genboard.websocket.message.OutcomingMessage;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@Component
public class DeleteCharacterSocketFlowHandler extends SocketFlowHandler {
	
	@Autowired
    private GameSetRepository gameSetRepository;
	
	@Autowired
    private ActorRepository actorRepository;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(SocketFlowHandler.class);

	@Override
	public void handle(IncomingMessage messageDTO, GameSetSocket partidaSocket) throws JSONException {
		DefaultActionDTO defaultActionDTO  = messageDTO.marshallize(DefaultActionDTO.class);
		Set<WebSocketSession> sessions = partidaSocket.getSessions();
		
		Long partidaId = partidaSocket.getGameSetId();
		Long actorId = defaultActionDTO.getActorId();
		
		GameSet partida = gameSetRepository.findById(partidaId).get();
		
		Actor actor = partida.getActorById(actorId);
		//actorRepository.delete(actor);
		partida.getActors().remove(actor);
		
		gameSetRepository.save(partida);
		
		OutcomingMessage<DefaultActionDTO> broadcast = new OutcomingMessage<DefaultActionDTO>("CONNECT_ACTOR_RESPONSE");
		TextMessage broadcastMessage = broadcast.textMessage(defaultActionDTO);
		
		for (WebSocketSession session : sessions) {
			try {
				session.sendMessage(broadcastMessage);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}		
		LOGGER.info("se borro un Actor");		
	}

}
