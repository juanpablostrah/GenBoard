package org.genboard.websocket.dto;


import java.util.List;

import org.genboard.model.ThrowDice;
import org.json.JSONException;
import org.json.JSONObject;

public class RollResponseDTO {
	
	ThrowDice throwDice;
	public List<Integer> dice;

}
