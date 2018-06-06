package org.genboard.websocket.dto;


import java.util.List;

import org.genboard.model.ThrowDice;

public class RollRequestDTO {
	
	ThrowDice throwDice;
	// aca deberias tener un objeto diceResult, que tiene el dice
	public List<Integer> dice;
	public List<Integer> results;
	
    //DTO = DATA TRANSFER OBJECT
	// NO TIENEN LOGICA

}
