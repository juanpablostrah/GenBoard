package org.genboard.websocket;

import java.util.HashMap;
import java.util.Map;

import org.genboard.model.ThrowDice;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class GameSetTextWebSocketHandler extends TextWebSocketHandler {

	private ThrowDice throwDice;
	
	private PartidaSocket<WebSocketSession> partidaSocket;

	private static final Logger LOGGER = LoggerFactory.getLogger(GameSetTextWebSocketHandler.class);

	AuthenticationProvider authenticationProvider;

	Map<Integer, PartidaSocket<WebSocketSession>> partidas = new HashMap<Integer, PartidaSocket<WebSocketSession>>();
	
	private SocketMessageDTO socketMessageDTO;

	public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

		SocketMessageDTO messageDTO = new SocketMessageDTO(message.getPayload());
		if ("AUTHORIZE".equals(messageDTO.tag)) {
			JSONObject jsonObj = messageDTO.payload;
			Integer partidaId = jsonObj.getInt("partidaId");
			Integer actorId = jsonObj.getInt("actorId");

			session.getAttributes().put("partidaId", partidaId);
			session.getAttributes().put("actorId", actorId);
			
			PartidaSocket<WebSocketSession> partidaSocket = partidas.get(partidaId);
			if (partidaSocket == null) {
				partidaSocket = new PartidaSocket<WebSocketSession>();
				partidas.put(partidaId, partidaSocket);
			}
			partidaSocket.addSession(session);

			for (WebSocketSession webSocketSession : getPartidaSocket().getSessions()) {
				String broadcastMssage = "Usuario conectado: " + actorId;
				webSocketSession.sendMessage(new TextMessage(broadcastMssage));
			}
		}else {
			
			Integer partidaId = (Integer) session.getAttributes().get("partidaId");
			Integer actorId = (Integer) session.getAttributes().get("actorId");
			
			switch (messageDTO.tag) {
			case "throw": {
				
				System.out.println("entro al switch");
				for (WebSocketSession webSocketSession : getPartidaSocket().getSessions()) {
					String broadcastMssage = "Resultado tirada: " + "20";
					System.out.println("antes del buildThrow");
					JSONObject result = this.throwDice.buildThrow(messageDTO.data);
					SocketMessageDTO socketMessageDTOResult = new SocketMessageDTO("throwResult", result);
					webSocketSession.sendMessage(new TextMessage(socketMessageDTOResult.data));
				}
				break;
			}
			case "giveTurn": {
				break;
			}
			case "Initiative": {
				break;
			}
			case "History": {
				break;
			}
		}
			
			LOGGER.info("handling socket input" + messageDTO.tag);
			
			if (partidaId != null) {
				PartidaSocket<WebSocketSession> partidaSocket = partidas.get(partidaId);
				for (WebSocketSession webSocketSession : partidaSocket.getSessions()) {
					String broadcastMssage = "Usuario: " + actorId + " envio: " + messageDTO.data;
					webSocketSession.sendMessage(new TextMessage(broadcastMssage));
				}
			} else {
				throw new RuntimeException("usuario no autorizado");
			}
		}


	}

	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		LOGGER.info("Connection established");
	}

	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		Integer partidaId = (Integer) session.getAttributes().get("partidaId");
		if (partidaId != null) {
			PartidaSocket<WebSocketSession> partidaSocket = partidas.get(partidaId);
			partidaSocket.getSessions().remove(session);
			if (partidaSocket.getSessions().isEmpty()) {
				// elimino la partida del conjunto para desasociarla del arbol
				// de referencias de java y permitir que GC la borre
				partidas.remove(partidaId);
			}
		}
		super.afterConnectionClosed(session, status);
	}

	public PartidaSocket<WebSocketSession> getPartidaSocket() {
		return partidaSocket;
	}

	public void setPartidaSocket(PartidaSocket<WebSocketSession> partidaSocket) {
		this.partidaSocket = partidaSocket;
	}

	public SocketMessageDTO getSocketMessageDTO() {
		return socketMessageDTO;
	}

	public void setSocketMessageDTO(SocketMessageDTO socketMessageDTO) {
		this.socketMessageDTO = socketMessageDTO;
	}
	
	
	
	

}
