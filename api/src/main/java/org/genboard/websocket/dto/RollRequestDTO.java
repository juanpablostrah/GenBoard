package org.genboard.websocket.dto;


import java.util.List;

import org.genboard.model.Dice;
import org.genboard.model.ThrowDice;
import org.json.JSONException;
import org.json.JSONObject;


public class RollRequestDTO {
	
	ThrowDice throwDice;
	
	// aca deberias tener un objeto diceResult, que tiene el dice
	public List<Integer> dice;
	public List<Dice> results;
	public JSONObject dataSet;
	
    //DTO = DATA TRANSFER OBJECT
	// NO TIENEN LOGICA
	
	public JSONObject generateRamdomDie(String dataSet){
		try {
			System.out.println("build throw");
			return throwDice.buildThrow(dataSet);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

}
