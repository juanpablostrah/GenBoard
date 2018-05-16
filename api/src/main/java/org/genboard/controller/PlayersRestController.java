package org.genboard.controller;


import org.genboard.model.Player;
import org.genboard.repository.PlayerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${rest.base_path}/player")
public class PlayersRestController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(PlayersRestController.class);
	
    @Autowired
    private PlayerRepository playerRepository;
	
	@RequestMapping(
		value = "", 
		method = RequestMethod.GET)
    public void index(
		@RequestParam("history") String history,
        @RequestParam("narrator") String narrator
    ) {		
        LOGGER.info("index player");
    }
	
	@RequestMapping(
		value = "", 
		method = RequestMethod.POST)
    public void create(@RequestBody Player player) {		
        LOGGER.info("create player: " + player.getUserAccount().getUsername());
    }

//	public PlayerRepository getPlayerRepository() {
//		return playerRepository;
//	}
//
//	public void setPlayerRepository(PlayerRepository playerRepository) {
//		this.playerRepository = playerRepository;
//	}

}
