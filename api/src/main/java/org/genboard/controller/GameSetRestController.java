package org.genboard.controller;


import java.util.List;

import org.genboard.model.GameSet;
import org.genboard.repository.GameSetRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void create(@RequestBody GameSet gameSet) {
		getGameSetRepository().save(gameSet);
        LOGGER.info("partida creada" + gameSet.getName());
    }
	
	@ResponseBody
	@RequestMapping(
			value = "getAll", 
			method = RequestMethod.GET)
	    public List<GameSet> getAllGameSet() {
	        LOGGER.info("obteniendo partidas");
			return getGameSetRepository().findAll();
	    }

	public GameSetRepository getGameSetRepository() {
		return gameSetRepository;
	}

	public void setGameSetRepository(GameSetRepository gameSetRepository) {
		this.gameSetRepository = gameSetRepository;
	}


}
