package org.genboard.websocket;

import org.json.JSONException;
import org.json.JSONObject;

public class SocketMessageDTO {
	
	public String tag;
	
	public String data;
	
	public JSONObject payload;
	
	public SocketMessageDTO(String data) {		
		try {
			JSONObject jsonObj = new JSONObject(data);
			this.tag = jsonObj.getString("tag");
			try {
				this.payload = jsonObj.getJSONObject("data");	
			} catch (JSONException e) {
				this.data = jsonObj.getString("data");
			}			
			
		} catch (JSONException e) {
			//all fields remains null
			e.printStackTrace();
		}		
	}
	
	public SocketMessageDTO(String tag, JSONObject payload) {		
		this.data = "{ tag: " + tag + ", data:" + payload.toString()+ " }";
	}
	
	
}
