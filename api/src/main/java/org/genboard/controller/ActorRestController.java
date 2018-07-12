package org.genboard.controller;

import org.genboard.model.Actor;
import org.genboard.model.Coord;
import org.genboard.model.Token;
import org.genboard.repository.ActorRepository;
import org.genboard.repository.CoordRepository;
import org.genboard.repository.TokenRepository;
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
	private TokenRepository tokenRepository;

	@Autowired
	private CoordRepository coordRepository;
	
	@ResponseBody
	@RequestMapping(value = "", method = RequestMethod.POST)
	public Actor create(@RequestBody Actor actor) {
		LOGGER.info("creando actor" + actor.getName());
		if(!actor.getDm()){
			Coord coord = new Coord(new Double(0), new Double(0));
			coordRepository.save(coord);
			Token token = new Token();
			token.setCoord(coord);
			actor.setToken(token);
			token = tokenRepository.save(token);
			Actor newActor = actorRepository.save(actor);
			token.setGameSet(actor.getGameSet());
			token.setActor(newActor);
			//token.setSecondActor(newActor);
			tokenRepository.save(token);
			return newActor;
		}else {
			return actorRepository.save(actor);
		}
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
