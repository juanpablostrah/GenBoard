package org.genboard.websocket.flow;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.genboard.model.Actor;
import org.genboard.model.GameSet;
import org.genboard.model.ThrowDice;
import org.genboard.model.Token;
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
public class NewCharacterSocketFlowHandler extends SocketFlowHandler {
	
	@Autowired
    private GameSetRepository gameSetRepository;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(SocketFlowHandler.class);

	@Override
	public void handle(IncomingMessage messageDTO, GameSetSocket partidaSocket) throws JSONException {
		DefaultActionDTO tokenDTO = messageDTO.marshallize(DefaultActionDTO.class);
		Set<WebSocketSession> sessions = partidaSocket.getSessions();
		
		Long partidaId = partidaSocket.getGameSetId();	
		GameSet partida = gameSetRepository.findById(partidaId).get();
		
		List<ActorDTO> actorList = new ArrayList<>();
		
		JSONObject jsonTokens = new JSONObject();
		List<Token> tokens = partida.getTokens();
		JSONArray arrayTokens = new JSONArray();
		for (Token token : tokens) {
			JSONObject json = new JSONObject();
			json.put("actorId", token.getActor().getId());
			json.put("x", token.getCoord().getX());
			json.put("z", token.getCoord().getZ());
			arrayTokens.put(json);
		}
		jsonTokens.put("tokens", arrayTokens);
		
		OutcomingMessage<String> broadcastToken = new OutcomingMessage<String>("SET_TOKEN_RESPONSE");
		TextMessage broadcastTokens = broadcastToken.textMessage(jsonTokens.toString());
		
		OutcomingMessage<DefaultActionDTO> broadcast = new OutcomingMessage<DefaultActionDTO>("CONNECT_ACTOR_RESPONSE");
		TextMessage broadcastMessage = broadcast.textMessage(tokenDTO);
		
		for (WebSocketSession session : sessions) {
			try {
				session.sendMessage(broadcastMessage);
				session.sendMessage(broadcastTokens);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}		
		LOGGER.info("se creo un nuevo Personaje");		
	}

}
