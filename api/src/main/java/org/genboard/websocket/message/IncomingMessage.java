package org.genboard.websocket.message;

import java.io.IOException;

import org.json.JSONException;
import org.json.JSONObject;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class IncomingMessage {
	
	private String tag;
	
	public String getTag() {
		return tag;
	}

	private String data;
	
	public IncomingMessage(String payload) {		
		try {
			JSONObject jsonObj = new JSONObject(payload);
			this.tag = jsonObj.getString("tag");
			this.data = jsonObj.get("data").toString();	
			//el json object te permite obtener un atributo sin parsear y es lo qeu necesitamos
			// porque no sabemos como parsearlo
		} catch (JSONException e) {
			//all fields remains null
			e.printStackTrace();
		}
	}
	
	public <T extends Object> T marshallize(Class<T> contentClass) {
		//hasta que alguien te dice como con este contentClass
        ObjectMapper mapper = new ObjectMapper();

		try {
			T message = mapper.readValue(this.data, contentClass);
			return message;
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
}
