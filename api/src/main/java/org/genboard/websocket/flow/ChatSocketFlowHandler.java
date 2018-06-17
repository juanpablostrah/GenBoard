package org.genboard.websocket.flow;

import java.io.IOException;
import java.util.Set;

import org.genboard.model.ThrowDice;
import org.genboard.websocket.PartidaSocket;
import org.genboard.websocket.dto.ChatDTO;
import org.genboard.websocket.message.IncomingMessage;
import org.genboard.websocket.message.OutcomingMessage;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@Component
public class ChatSocketFlowHandler extends SocketFlowHandler {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(SocketFlowHandler.class);

	@Override
	public void handle(IncomingMessage messageDTO, PartidaSocket partidaSocket) {
		ChatDTO chatDTO = messageDTO.marshallize(ChatDTO.class);
		Set<WebSocketSession> sessions = partidaSocket.getSessions();
		
		OutcomingMessage<ChatDTO> broadcast = new OutcomingMessage<ChatDTO>("CHAT_RESPONSE");
		
		TextMessage broadcastMessage = broadcast.textMessage(chatDTO);		
		for (WebSocketSession session : sessions) {
			try {
				session.sendMessage(broadcastMessage);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}		
		LOGGER.info("se envio el mensaje de actorId " + chatDTO.actorId +
				" con el mensaje " + chatDTO.chat);		
	}

}
