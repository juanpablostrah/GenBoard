package org.genboard.websocket.flow;

import java.io.IOException;
import java.util.Set;

import org.genboard.websocket.GameSetSocket;
import org.genboard.websocket.dto.TokenRequestDTO;
import org.genboard.websocket.message.IncomingMessage;
import org.genboard.websocket.message.OutcomingMessage;
import org.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;


@Component
public class MoveTokenSocketFlowHandler extends SocketFlowHandler {

	private static final Logger LOGGER = LoggerFactory.getLogger(SocketFlowHandler.class);

	@Override
	public void handle(IncomingMessage messageDTO, GameSetSocket partidaSocket) {
		TokenRequestDTO tokenDTO = messageDTO.marshallize(TokenRequestDTO.class);
		Set<WebSocketSession> sessions = partidaSocket.getSessions();
		
		OutcomingMessage<TokenRequestDTO> broadcast = new OutcomingMessage<TokenRequestDTO>("MOVE_TOKEN_RESPONSE");
		
		TextMessage broadcastMessage = broadcast.textMessage(tokenDTO);		
		for (WebSocketSession session : sessions) {
			try {
				session.sendMessage(broadcastMessage);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}		
		LOGGER.info("el actor "+ tokenDTO.getActorId()+ " movio una ficha");		

	}


}
