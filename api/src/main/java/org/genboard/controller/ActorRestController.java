package org.genboard.controller;

import java.util.Optional;

import org.genboard.model.Actor;
import org.genboard.model.GameSet;
import org.genboard.model.Initiative;
import org.genboard.model.Throw;
import org.genboard.repository.ActorRepository;
import org.genboard.repository.GameSetRepository;
import org.genboard.repository.ThrowRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	@Autowired
	private ThrowRepository throwRepository;

	@ResponseBody
	@RequestMapping(value = "", method = RequestMethod.POST)
	public Actor create(@RequestBody Actor actor) {
		GameSet currentGameSet = gameSetRepository.findById(actor.getGameSet().getId()).get();
		Throw newThrow = throwRepository.save(new Throw());
		Initiative initiative = currentGameSet.getInitiative();
		initiative.getInitiativeThrow().add(newThrow);
		actor.setGameSet(currentGameSet);
		LOGGER.info("creando actor" + actor.getName());
		return actorRepository.save(actor);
	}
	
	@ResponseBody
	@RequestMapping(
			value = "getById/{id}", 
			method = RequestMethod.GET)
	    public Actor get(@PathVariable("id") long id) {
	        LOGGER.info("obteniendo actor con el id : " + id);
			return actorRepository.findById(id).get();
	    }

}
