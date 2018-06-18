package org.genboard.controller;

import org.genboard.model.Initiative;
import org.genboard.repository.InitiativeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${rest.base_path}/initiative")
public class InitiativeRestController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(InitiativeRestController.class);
	
    @Autowired
    private InitiativeRepository initiativeRepository;
	
	@RequestMapping(
		value = "", 
		method = RequestMethod.POST)
    public Initiative create(@RequestBody Initiative initiative) {
        LOGGER.info("iniciativa creada" );
        return initiativeRepository.save(initiative);
    }
	
}

