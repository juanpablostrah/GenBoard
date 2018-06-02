package org.genboard.model;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class ThrowDice {

	public JSONObject buildThrow(String dataSet){
		JSONArray jsonArray = null;
		JSONObject result = new JSONObject();
		try {
			jsonArray = new JSONArray(dataSet);
			for (int i = 0; i < jsonArray.length(); i++) {
			    JSONObject json = jsonArray.getJSONObject(i);
			    JSONArray results = json.getJSONArray("results");
			    for (int j = 0; j < (Integer)json.getInt("value"); j++) {
					results.put(this.throwDice(json.getInt("descriptor")));
				}        
			}
			result.put("result", jsonArray);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return result;
	}

	private Integer throwDice(Integer descriptor) {
		return (int) Math.floor(Math.random() * (descriptor)) + 1;		
	}

}


