package org.genboard.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;



@Configuration
@EnableWebMvc
public class CorsConfiguration{
	
	@Autowired
	RestCorsFilter restCorsFilter;

	public void addCorsMappings(CorsRegistry registry){
		registry.addMapping("/**")
		  .allowedOrigins("http://localhost:9001", "http://0.0.0.0:9001", "http://127.0.0.1:9001")
		  .allowedHeaders("*")
		  .allowedMethods("*")
		  .allowCredentials(true);
	}
}
