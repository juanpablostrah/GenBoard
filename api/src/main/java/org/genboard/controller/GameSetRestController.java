package org.genboard.controller;


import java.util.List;

import org.genboard.model.Actor;
import org.genboard.model.GameSet;
import org.genboard.model.Initiative;
import org.genboard.model.Player;
import org.genboard.repository.GameSetRepository;
import org.genboard.repository.InitiativeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${rest.base_path}/gameSet")
public class GameSetRestController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(GameSetRestController.class);
	
    @Autowired
    private GameSetRepository gameSetRepository;
    
    @Autowired
    private InitiativeRepository initiativeRepository;
	
	@RequestMapping(
		value = "", 
		method = RequestMethod.GET)
    public void index(
		@RequestParam("historia") String historia,
        @RequestParam("narrador") String narrador
    ) {		
        LOGGER.info("index partidas");
    }
	
	@RequestMapping(
		value = "", 
		method = RequestMethod.POST)
    public GameSet create(@RequestBody GameSet gameSet) {
        LOGGER.info("partida creada" + gameSet.getName());
        Initiative initiative = initiativeRepository.save(new Initiative());
        gameSet.setInitiative(initiative);
        return gameSetRepository.save(gameSet);
    }
	
	@ResponseBody
	@RequestMapping(
			value = "getAll", 
			method = RequestMethod.GET)
	    public List<GameSet> getAllGameSet() {
	        LOGGER.info("obteniendo partidas");
			return gameSetRepository.findAll();
	    }
	
	@ResponseBody
	@RequestMapping(
			value = "getAllGuest/{id}", 
			method = RequestMethod.GET)
	    public List<Player> getAllGuest(@PathVariable("id") long id) {
	        LOGGER.info("obteniendo invitados");
			return gameSetRepository.findById(id).get().getGuests();
	    }
	
	@ResponseBody
	@RequestMapping(
			value = "getAllActors/{id}", 
			method = RequestMethod.GET)
	    public List<Actor> getAllActors(@PathVariable("id") long id) {
	        LOGGER.info("obteniendo actores");
			return gameSetRepository.findById(id).get().getActors();
	    }
	
	@ResponseBody
	@RequestMapping(
			value = "getById/{id}", 
			method = RequestMethod.GET)
	    public GameSet get(@PathVariable("id") long id) {
	        LOGGER.info("obteniendo partida con el id : " + id);
			return gameSetRepository.findById(id).get();
	    }
}
