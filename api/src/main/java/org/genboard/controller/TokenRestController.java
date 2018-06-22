package org.genboard.controller;

import org.genboard.model.Token;
import org.genboard.repository.TokenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${rest.base_path}/token")
public class TokenRestController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(TokenRestController.class);
	
    @Autowired
    private TokenRepository tokenRepository;
	
	@RequestMapping(
		value = "", 
		method = RequestMethod.POST)
    public Token create(@RequestBody Token token) {
        LOGGER.info("ficha creada" );
        return tokenRepository.save(token);
    }
	
}