package org.genboard.controller;


import org.genboard.model.Actor;
import org.genboard.model.GameSet;
import org.genboard.repository.ActorRepository;
import org.genboard.repository.GameSetRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${rest.base_path}/actor")
public class ActorRestController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ActorRestController.class);
	
    @Autowired
    private ActorRepository actorRepository;
    
    @Autowired
    private GameSetRepository gameSetRepository;
	
    @ResponseBody 
    @RequestMapping(
    		value = "", 
    		method = RequestMethod.POST)
        public Actor create(@RequestBody Actor actor) {
    		LOGGER.info("actor creado" + actor.getName());    		
    		//Long gameSetId = actor.getGameSet().getId();
			//GameSet gameSet = gameSetRepository.getOne(2);
			//actor.setGameSet(gameSet);    		
    		return actorRepository.save(actor);            
        }

}
