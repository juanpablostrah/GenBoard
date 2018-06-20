package org.genboard.websocket;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.genboard.model.Actor;
import org.genboard.model.GameSet;
import org.genboard.repository.GameSetRepository;
import org.genboard.websocket.dto.ActorDTO;
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
	GameSetSocketFlowManager gameSetSocketFlowManager;
	
	AuthenticationProvider authenticationProvider;	
	
	Map<Long, GameSetSocket> gameSetSockets = new HashMap<Long, GameSetSocket>();

	public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {	
		IncomingMessage messageDTO = new IncomingMessage(message.getPayload());		
		String tag = messageDTO.getTag();
		
		if("AUTHORIZE".equals(tag)) {	
			AuthorizeDTO authorizeDTO = messageDTO.marshallize(AuthorizeDTO.class);					
			Long partidaId = authorizeDTO.partidaId;
			Long actorId = authorizeDTO.actorId;
			session.getAttributes().put("partidaId", partidaId);
			session.getAttributes().put("actorId", actorId);			
			GameSetSocket partidaSocket = gameSetSockets.get(partidaId);
			if(partidaSocket == null) {
				partidaSocket = new GameSetSocket(partidaId);
				gameSetSockets.put(partidaId, partidaSocket);
			}
			partidaSocket.addSession(session);
			OutcomingMessage<String> response = new OutcomingMessage<String>("CONNECTION_SUCCESS");
			TextMessage responseMessage = response.textMessage(null);
			session.sendMessage(responseMessage);
			LOGGER.info("Conection Success");
			
			GameSet partida = gameSetRepository.findById(partidaId).get();
			
			List<ActorDTO> actorList = new ArrayList<>();
			
			for (Actor actor : partida.getActors()) {
				ActorDTO actorDTO = new ActorDTO();
				ActorDTO actorDTOResult= actorDTO.buildActor(actor);
				actorList.add(actorDTOResult);
			}
		
			OutcomingMessage<List<ActorDTO>> broadcast = new OutcomingMessage<List<ActorDTO>>("CONNECT_ACTOR_RESPONSE");
			TextMessage broadcastMessage = broadcast.textMessage(actorList);
			for (WebSocketSession webSocketSession : partidaSocket.getSessions()) {
//				if(webSocketSession.equals(session)) {
//					//no se envia el mensaje al jugador que se conecta
//					continue;
//				}
				webSocketSession.sendMessage(broadcastMessage);
			}
			LOGGER.info("Getting actor list");
		}
		else {
			LOGGER.info("handling socket input" + tag);
			Long partidaId = (Long) session.getAttributes().get("partidaId");
			if(partidaId == null) {
				throw new RuntimeException("usuario no autorizado");
			}
			GameSetSocket partidaSocket = gameSetSockets.get(partidaId);			
			gameSetSocketFlowManager.handle(messageDTO, partidaSocket);
		}
	
	}

	public void afterConnectionEstablished(WebSocketSession session) throws Exception {		
		LOGGER.info("Connection established");
	}
	
	
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		Long partidaId = (Long) session.getAttributes().get("partidaId");
		if(partidaId != null) {
			GameSetSocket partidaSocket = gameSetSockets.get(partidaId);
			partidaSocket.getSessions().remove(session);
			if(partidaSocket.getSessions().isEmpty()) {
				// elimino la partida del conjunto para desasociarla del arbol
				// de referencias de java y permitir que GC la borre
				gameSetSockets.remove(partidaId);
			}
		}
		super.afterConnectionClosed(session, status);			
	}
	
	
}


