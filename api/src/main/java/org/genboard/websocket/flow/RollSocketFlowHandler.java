package org.genboard.websocket.flow;

import java.io.IOException;
import java.util.Set;

import org.genboard.model.ThrowDice;
import org.genboard.websocket.GameSetSocket;
import org.genboard.websocket.message.IncomingMessage;
import org.genboard.websocket.message.OutcomingMessage;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@Component
public class RollSocketFlowHandler extends SocketFlowHandler {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(SocketFlowHandler.class);

	public void handle(IncomingMessage messageDTO, GameSetSocket partidaSocket) throws JSONException {
		JSONObject data = new JSONObject(messageDTO.getData());
		String actorId = (String) data.get("actorId");
		JSONObject dataSetNew = (JSONObject) data.get("dataSet");
		
		ThrowDice throwDice = new ThrowDice();
		JSONObject results = throwDice.buildThrow(dataSetNew.toString());
		Set<WebSocketSession> sessions = partidaSocket.getSessions();
		OutcomingMessage<String> broadcast = new OutcomingMessage<String>("ROLL_RESPONSE");
		
		JSONObject jsonReturn = new JSONObject();
		jsonReturn.put("dataSet", results);
		jsonReturn.put("actorId", actorId);
		
		//TextMessage broadcastMessage = broadcast.textMessage(results.toString());
		TextMessage broadcastMessage = broadcast.textMessage(jsonReturn.toString());
		for (WebSocketSession session : sessions) {
			try {
				session.sendMessage(broadcastMessage);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}		
		LOGGER.info("se completo una tirada del id:" + actorId);		
	}
	
	

}
