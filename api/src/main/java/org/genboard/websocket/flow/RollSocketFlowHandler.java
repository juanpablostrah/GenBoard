package org.genboard.websocket.flow;

import java.io.IOException;
import java.util.Set;

import org.genboard.model.ThrowDice;
import org.genboard.websocket.PartidaSocket;
import org.genboard.websocket.dto.RollRequestDTO;
import org.genboard.websocket.dto.RollResponseDTO;
import org.genboard.websocket.message.IncomingMessage;
import org.genboard.websocket.message.OutcomingMessage;
import org.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import org.json.JSONObject;

public class RollSocketFlowHandler extends SocketFlowHandler {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(SocketFlowHandler.class);

	public void handle(IncomingMessage messageDTO, PartidaSocket partidaSocket) throws JSONException {
		String dataSet = messageDTO.getData();
		ThrowDice throwDice = new ThrowDice();
		JSONObject results = throwDice.buildThrow(dataSet);
		//RollRequestDTO rollRequestDTO = messageDTO.marshallize(RollRequestDTO.class);
		//aca tenes que llenar el response con los resultados de los datos del request
		// mete un servicio por favor
		RollResponseDTO rollResponseDTO = new RollResponseDTO();
		Set<WebSocketSession> sessions = partidaSocket.getSessions();
		//OutcomingMessage<RollResponseDTO> broadcast = new OutcomingMessage<RollResponseDTO>("ROLL_RESPONSE");
		OutcomingMessage<String> broadcast = new OutcomingMessage<String>("ROLL_RESPONSE");
		
		TextMessage broadcastMessage = broadcast.textMessage(results.toString());		
		for (WebSocketSession session : sessions) {
			try {
				session.sendMessage(broadcastMessage);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}		
		LOGGER.info("se completo una tirada");		
	}
	
	

}