package org.genboard.websocket;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import org.genboard.model.Actor;
import org.genboard.model.GameSet;
import org.genboard.model.ThrowDice;
import org.genboard.repository.GameSetRepository;
import org.genboard.websocket.dto.RollResponseDTO;
import org.genboard.websocket.flow.SocketFlowHandler;
import org.genboard.websocket.message.IncomingMessage;
import org.genboard.websocket.message.OutcomingMessage;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

public class ConnectActorSocketFlowHandler extends SocketFlowHandler {
	
	@Autowired
    private GameSetRepository gameSetRepository;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(SocketFlowHandler.class);

	public void handle(IncomingMessage messageDTO, PartidaSocket partidaSocket) throws JSONException {
		
		String partidaId = messageDTO.getData();
		
		GameSet partida = gameSetRepository.findById(Long.getLong(partidaId)).get();
		List<Actor> actorList = partida.getActors();
		
		RollResponseDTO rollResponseDTO = new RollResponseDTO();
		Set<WebSocketSession> sessions = partidaSocket.getSessions();
	
		OutcomingMessage<List<Actor>> broadcast = new OutcomingMessage<List<Actor>>("CONNECT_ACTOR_RESPONSE");
		
		TextMessage broadcastMessage = broadcast.textMessage(actorList);		
		for (WebSocketSession session : sessions) {
			try {
				session.sendMessage(broadcastMessage);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}		
		LOGGER.info("se conecto un personaje");		
	}


}
