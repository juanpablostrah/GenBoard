package org.genboard.websocket.flow;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import org.genboard.model.Actor;
import org.genboard.model.GameSet;
import org.genboard.model.Initiative;
import org.genboard.model.Throw;
import org.genboard.model.ThrowDice;
import org.genboard.repository.GameSetRepository;
import org.genboard.repository.InitiativeRepository;
import org.genboard.repository.ThrowRepository;
import org.genboard.websocket.GameSetSocket;
import org.genboard.websocket.dto.DefaultActionDTO;
import org.genboard.websocket.dto.InitiativeResponseDTO;
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
public class InitiativeResponseSocketFlowHandler extends SocketFlowHandler {

	private static final Logger LOGGER = LoggerFactory.getLogger(SocketFlowHandler.class);
	
	@Autowired
    private GameSetRepository gameSetRepository;
	
	@Autowired
    private ThrowRepository throwRepository;
	
	
	@Autowired
    private InitiativeRepository initiativeRepository;
	
	@Override
	public void handle(IncomingMessage messageDTO, GameSetSocket partidaSocket) throws JSONException {
		//calculo la tirada
		JSONObject data = new JSONObject(messageDTO.getData());
		String actorId = (String) data.get("actorId");
		
		ThrowDice throwDice = new ThrowDice();
		Integer result20Dice = throwDice.throwDice(20);
		
		String results = "{result: { dataSet: [{descriptor: 4,value: 0,modifier:0,results:[]}," 
						 +"{descriptor: 6,value: 0,modifier:0,results:[]}," 
						 +"{descriptor: 8,value: 0,modifier:0,results:[]},"
						 +"{descriptor: 10,value: 0,modifier:0,results:[]},"
						 +"{descriptor: 12,value: 0,modifier:0,results:[]},"
						 +"{descriptor: 20,value: "+1+",modifier:0,results:["+ result20Dice +"]}]}}";
		JSONObject jsonResults = new JSONObject(results);
		Set<WebSocketSession> sessions = partidaSocket.getSessions();
		OutcomingMessage<String> broadcast = new OutcomingMessage<String>("ROLL_RESPONSE");
		
		Integer partidaIdInt = data.getInt("partidaId");
		Long partidaId = new Long(partidaIdInt);		
		
		JSONObject jsonReturn = new JSONObject();
		jsonReturn.put("dataSet", jsonResults);
		jsonReturn.put("actorId", actorId);
		
		TextMessage broadcastMessage = broadcast.textMessage(jsonReturn.toString());
		for (WebSocketSession session : sessions) {
			try {
				session.sendMessage(broadcastMessage);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}		
		LOGGER.info("se completo una tirada del id:" + actorId);
		
		InitiativeResponseDTO initiativeResponseDTO = messageDTO.marshallize(InitiativeResponseDTO.class);

		GameSet partida = gameSetRepository.findById(partidaId).get();
		Initiative initiative = partida.getInitiative();	
		
		Throw currentThrow = initiative.currentThrow();		
		currentThrow.setResult(result20Dice);
		throwRepository.save(currentThrow);
		
		initiative.nextTurn();		
		initiativeRepository.save(initiative);
		
		
		//pregunto si es el ultimo actor de la lista para ordenarlos
		if(initiative.getTurn() == null) {	
			initiative.order();
			List<Long> actors = initiative.getActors();
			//initiativeRepository.save(initiative);
			
			String buildThrow = "{ throwsActorsId: "+ actors.toString() + " }";			
			JSONObject throwListJson = new JSONObject(buildThrow);
			
			OutcomingMessage<String> broadcastNextTurn = new OutcomingMessage<String>("SORTING_INITIATIVE");
			
			//initiativeResponseDTO.setThrowResults(initiative.getInitiativeThrow());
			
			TextMessage broadcastOrderList = broadcastNextTurn.textMessage(throwListJson.toString());		
			for (WebSocketSession session : sessions) {
				try {
					session.sendMessage(broadcastOrderList);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			LOGGER.info("ordenando Iniciativa");
			
			//sino le pido la tirada al siguiente, llamo al circuito del InitiativeSocketFlow
		}else {
			Throw nextThrow = initiative.currentThrow();
			Actor nextActor = nextThrow.getActor();
			Long nextActorId = nextActor.getId();
			DefaultActionDTO initiativeDTO = messageDTO.marshallize(DefaultActionDTO.class);
			OutcomingMessage<DefaultActionDTO> broadcast2 = new OutcomingMessage<DefaultActionDTO>("INITIATIVE_RESPONSE");
			TextMessage broadcastNextTurnMessage = broadcast2.textMessage(initiativeDTO);
			WebSocketSession nextSession = partidaSocket.findByActorId(nextActorId);
			try {
				nextSession.sendMessage(broadcastNextTurnMessage);
			} catch (IOException e) {
				e.printStackTrace();
			}
			LOGGER.info("el siguiente turno es de "+ nextActorId);
		}
		gameSetRepository.save(partida);

				

	}

}


