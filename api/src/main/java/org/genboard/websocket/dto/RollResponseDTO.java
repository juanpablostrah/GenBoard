package org.genboard.websocket.dto;


import java.util.List;

import org.genboard.model.Dice;
import org.genboard.model.ThrowDice;

public class RollResponseDTO {
	
	ThrowDice throwDice;
	
	
	public List<Dice> results;

}
