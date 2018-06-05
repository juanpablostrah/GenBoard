package org.genboard.model;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class ThrowDice {

	public JSONObject buildThrow(String dataSet) throws JSONException{
//		JSONArray jsonArray = null;
		JSONArray jsonArray = new JSONArray(dataSet);
		System.out.println("jjejejje");
		JSONObject result = new JSONObject();
		try {
			System.out.println("entro al 1er try");
			
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


