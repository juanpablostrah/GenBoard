package org.genboard.config;

import org.genboard.websocket.GameSetTextWebSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class CustomWebSocketConfig implements WebSocketConfigurer  {
	
	@Autowired
	GameSetTextWebSocketHandler gameSetTextWebSocketHandler;
	
    @Value("${rest.base_path}")
    private String basePath;

	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		
		String gameSetPath = basePath + "/socket/gameset";
		registry.addHandler(gameSetTextWebSocketHandler, gameSetPath)		
		.setAllowedOrigins("*")
		.withSockJS()
		.setStreamBytesLimit(4 * 1024 * 1024);
	}
}
