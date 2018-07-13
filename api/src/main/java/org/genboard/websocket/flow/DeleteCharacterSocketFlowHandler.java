package org.genboard.websocket.flow;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;

import org.genboard.model.Actor;
import org.genboard.model.GameSet;
import org.genboard.model.Throw;
import org.genboard.model.Token;
import org.genboard.repository.ActorRepository;
import org.genboard.repository.CoordRepository;
import org.genboard.repository.GameSetRepository;
import org.genboard.repository.InitiativeRepository;
import org.genboard.repository.ThrowRepository;
import org.genboard.repository.TokenRepository;
import org.genboard.websocket.GameSetSocket;
import org.genboard.websocket.dto.DefaultActionDTO;
import org.genboard.websocket.message.IncomingMessage;
import org.genboard.websocket.message.OutcomingMessage;
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
	
	@Autowired
    private ThrowRepository throwRepository;
	
	@Autowired
    private InitiativeRepository initiativeRepository;
	
	@Autowired
    private CoordRepository coordRepository;
	
	@Autowired
    private TokenRepository tokenRepository;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(SocketFlowHandler.class);

	@Override
	public void handle(IncomingMessage messageDTO, GameSetSocket partidaSocket) throws JSONException {
		DefaultActionDTO defaultActionDTO  = messageDTO.marshallize(DefaultActionDTO.class);
		Set<WebSocketSession> sessions = partidaSocket.getSessions();
		
		Long partidaId = partidaSocket.getGameSetId();
		Long actorId = defaultActionDTO.getActorId();
		
		GameSet partida = gameSetRepository.findById(partidaId).get();

		
		
		List<Throw> throws1 = throwRepository.findAll();
		for (Throw throw1 : throws1) {
			if(throw1.getActor().getId().equals(actorId)){
				//initiativeRepository.delete(throw1.getInitiative());
				throwRepository.delete(throw1);
			}
		}
			
		Actor actor = partida.getActorById(actorId);
//		partida.getDmActors().remove(actor);
//		partida.getActors().remove(actor);
		tokenRepository.delete(actor.getToken());
		//actorRepository.delete(actor);
		Token tokenToRemove = null;
		
		List<Token> tokens = partida.getTokens();
		for (Token token : tokens) {
			if(token.getActor().getId().equals(actorId)) {
				tokenToRemove = token;
				break;
			}
		}
		//tokens.remove(tokenToRemove);
		//gameSetRepository.save(partida);
		
		JSONObject jsonToken = new JSONObject();
		
		JSONObject json = new JSONObject();
		json.put("actorId", tokenToRemove.getActor().getId());

		jsonToken.put("token", json);
		
		OutcomingMessage<String> broadcastToken = new OutcomingMessage<String>("DELETE_TOKEN_RESPONSE");
		TextMessage broadcastTokens = broadcastToken.textMessage(jsonToken.toString());
		
		OutcomingMessage<DefaultActionDTO> broadcast = new OutcomingMessage<DefaultActionDTO>("CONNECT_ACTOR_RESPONSE");
		TextMessage broadcastMessage = broadcast.textMessage(defaultActionDTO);
		
		for (WebSocketSession session : sessions) {
			try {
				session.sendMessage(broadcastMessage);
				session.sendMessage(broadcastTokens);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}	
		LOGGER.info("se borro un Actor " + defaultActionDTO.getActorId());		
	}

}
