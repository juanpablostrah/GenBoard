package org.genboard.websocket.flow;

import java.io.IOException;
import java.util.Set;

import org.genboard.websocket.GameSetSocket;
import org.genboard.websocket.dto.DefaultActionDTO;
import org.genboard.websocket.message.IncomingMessage;
import org.genboard.websocket.message.OutcomingMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@Component
public class HistoryModeSocketFlowHandler extends SocketFlowHandler{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(SocketFlowHandler.class);

	@Override
	public void handle(IncomingMessage messageDTO, GameSetSocket partidaSocket) {
		DefaultActionDTO tokenDTO = messageDTO.marshallize(DefaultActionDTO.class);
		Set<WebSocketSession> sessions = partidaSocket.getSessions();
		
		OutcomingMessage<DefaultActionDTO> broadcast = new OutcomingMessage<DefaultActionDTO>("HISTORY_RESPONSE");
		
		TextMessage broadcastMessage = broadcast.textMessage(tokenDTO);		
		for (WebSocketSession session : sessions) {
			try {
				session.sendMessage(broadcastMessage);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}		
		LOGGER.info("entrando en modo Historia");		
	}


}
