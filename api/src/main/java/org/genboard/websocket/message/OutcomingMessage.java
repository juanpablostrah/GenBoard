package org.genboard.websocket.message;

import org.springframework.web.socket.TextMessage;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class OutcomingMessage<T> {
	
	public OutcomingMessage(String tag) {
		this.tag = tag;
	}

	private String tag;
	
	public TextMessage textMessage() {
		ObjectMapper mapper = new ObjectMapper();
		EmptyMessageDTO messageDTO = new EmptyMessageDTO();
		messageDTO.tag = this.tag;
		String raw;
		try {
			raw = mapper.writeValueAsString(messageDTO);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			raw = "{\"tag\":\"PROCESSING_ERROR\"}";
		}
		return new TextMessage(raw);
	}

	public TextMessage textMessage(T data) {
		if(data == null) {
			return this.textMessage();
		}
		ObjectMapper mapper = new ObjectMapper();
		MessageDTO<T> messageDTO = new MessageDTO<T>();
		messageDTO.tag = this.tag;
		messageDTO.data = data;
		String raw;
		try {
			raw = mapper.writeValueAsString(messageDTO);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			raw = "{\"tag\":\"PROCESSING_ERROR\"}";
		}
		return new TextMessage(raw);
	}
	
	private class MessageDTO<R>{
		@SuppressWarnings("unused")
		public String tag;
		@SuppressWarnings("unused")
		public R data;
	}
	
	private class EmptyMessageDTO{
		@SuppressWarnings("unused")
		public String tag;
	}

}
