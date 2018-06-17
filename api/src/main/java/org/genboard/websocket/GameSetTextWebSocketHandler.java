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
			LOGGER.info("Conection Success");
			
			GameSet partida = gameSetRepository.findById(new Long(partidaId)).get();
			//en vez de actor, devolve una lista de ActorDTOo
			//los actor DTO, llenalos con los datos del Actor
			// pero no con instancias de @entity porque te va a explotar
			// los resource lo resuelven controlando la profundidad de la serializacin
			// aca eso te cagaria la vida para entonces en el ActorDTO voy a tener los datos de ACTOR
			// y los voy a agregar a una List<ActorDTO> que va a ser lo que voy a devolver ?
			
			List<ActorDTO> actorList = new ArrayList<>();
			
			for (Actor actor : partida.getActors()) {
				ActorDTO actorDTO = new ActorDTO();
				ActorDTO actorDTOResult= actorDTO.buildActor(actor);
				actorList.add(actorDTOResult);
			}
		
			OutcomingMessage<List<ActorDTO>> broadcast = new OutcomingMessage<List<ActorDTO>>("CONNECT_ACTOR_RESPONSE");
			// no podes serializar automaticamente actorList 
			// tiene referencias circulares
			// tenes que crear un DTO que mapee solo un lado de la relacion
			// sino siempre te va a romper
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
			Integer partidaId = (Integer) session.getAttributes().get("partidaId");
			if(partidaId == null) {
				throw new RuntimeException("usuario no autorizado");
			}
			PartidaSocket partidaSocket = partidas.get(partidaId);			
			gameSetSocketFlowManager.handle(messageDTO, partidaSocket);
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


