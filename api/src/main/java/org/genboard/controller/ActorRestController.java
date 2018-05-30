package org.genboard.controller;


import org.genboard.model.Actor;
import org.genboard.repository.ActorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${rest.base_path}/actor")
public class ActorRestController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ActorRestController.class);
	
    @Autowired
    private ActorRepository actorRepository;
	
    @RequestMapping(
    		value = "", 
    		method = RequestMethod.POST)
        public void create(@RequestBody Actor actor) {
    	actorRepository.save(actor);
            LOGGER.info("actor creado" + actor.getName());
        }

}
