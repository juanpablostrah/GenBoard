package org.genboard.controller;

import org.genboard.exception.PlayerNotFountException;
import org.genboard.model.Player;
import org.genboard.repository.PlayerRepository;
import org.genboard.service.ISecurityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${rest.base_path}/security")
public class SecurityController {

    private static final Logger LOGGER = LoggerFactory.getLogger(SecurityController.class);

    @Autowired
    private ISecurityService securityService;
    @Autowired
    private PlayerRepository developerRepository;
    
    @RequestMapping(value = "/sessionPlayer", method = RequestMethod.GET)
    public SessionPlayerDTO sessionPlayer() {
        LOGGER.debug("returning current session player");
        Player player = developerRepository.findByUsername(securityService.getLoggedUsername());
        if(player == null){
            throw new PlayerNotFountException();
        }
        return new SessionPlayerDTO(player);
    }
    
    class SessionPlayerDTO{
    	public Long id;
    	public String username;
		public SessionPlayerDTO(Player player) {
			id = player.getId();
			username = player.getUsername();
		}
    }
    
}
