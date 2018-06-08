package org.genboard.websocket;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.genboard.model.Actor;
import org.genboard.model.GameSet;
import org.genboard.repository.GameSetRepository;
import org.genboard.websocket.dto.AuthorizeDTO;
import org.genboard.websocket.message.IncomingMessage;
import org.genboard.websocket.message.OutcomingMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class GameSetTextWebSocketHandler extends TextWebSocketHandler {

	private static final Logger LOGGER = LoggerFactory.getLogger(GameSetTextWebSocketHandler.class);
	
	@Autowired
    private GameSetRepository gameSetRepository;
	
	@Autowired
	GameSetSocketFlowHandler gameSetSocketFlowHandler;
	
	AuthenticationProvider authenticationProvider;	
	
	Map<Integer, PartidaSocket> partidas = new HashMap<Integer, PartidaSocket>();

	public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {	
		IncomingMessage messageDTO = new IncomingMessage(message.getPayload());		
		String tag = messageDTO.getTag();
		
		if("AUTHORIZE".equals(tag)) {	
			AuthorizeDTO authorizeDTO = messageDTO.marshallize(AuthorizeDTO.class);					
			Integer partidaId = authorizeDTO.partidaId;
			Integer actorId = authorizeDTO.actorId;
			session.getAttributes().put("partidaId", partidaId );
			session.getAttributes().put("actorId", actorId);			
			PartidaSocket partidaSocket = partidas.get(partidaId);
			if(partidaSocket == null) {
				partidaSocket = new PartidaSocket();
				partidas.put(partidaId, partidaSocket);
			}
			partidaSocket.addSession(session);
			OutcomingMessage<String> response = new OutcomingMessage<String>("CONNECTION_SUCCESS");
			TextMessage responseMessage = response.textMessage(null);
			session.sendMessage(responseMessage);
			
			GameSet partida = gameSetRepository.findById(new Long(partidaId)).get();
			List<Actor> actorList = partida.getActors();
		
//			OutcomingMessage<List<Actor>> broadcast = new OutcomingMessage<List<Actor>>("CONNECT_ACTOR_RESPONSE");
//
//			TextMessage broadcastMessage = broadcast.textMessage(actorList);
//			for (WebSocketSession webSocketSession : partidaSocket.getSessions()) {
//				if(webSocketSession.equals(session)) {
//					//no se envia el mensaje al jugador que se conecta
//					continue;
//				}
//				webSocketSession.sendMessage(broadcastMessage);
//			}
		}
		else {
			LOGGER.info("handling socket input" + tag);
			Integer partidaId = (Integer) session.getAttributes().get("partidaId");
			if(partidaId == null) {
				throw new RuntimeException("usuario no autorizado");
			}
			PartidaSocket partidaSocket = partidas.get(partidaId);			
			gameSetSocketFlowHandler.handle(messageDTO, partidaSocket);
		}
	
	}

	public void afterConnectionEstablished(WebSocketSession session) throws Exception {		
		LOGGER.info("Connection established");
	}
	
	
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		Integer partidaId = (Integer) session.getAttributes().get("partidaId");
		if(partidaId != null) {
			PartidaSocket partidaSocket = partidas.get(partidaId);
			partidaSocket.getSessions().remove(session);
			if(partidaSocket.getSessions().isEmpty()) {
				// elimino la partida del conjunto para desasociarla del arbol
				// de referencias de java y permitir que GC la borre
				partidas.remove(partidaId);
			}
		}
		super.afterConnectionClosed(session, status);			
	}
	
	
}


