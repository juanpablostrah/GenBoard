package org.genboard.seeder;

import javax.annotation.PostConstruct;

import org.genboard.model.Player;
import org.genboard.model.UserAccount;
import org.genboard.repository.PlayerRepository;
import org.hibernate.annotations.common.util.impl.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.password.PasswordEncoder;

@Component
public class PlayerSeeder {
	
	private static final org.jboss.logging.Logger LOGGER = LoggerFactory.logger(PlayerSeeder.class);
	
	@Autowired
	PlayerRepository playerRepository;

//	@PostConstruct
//	private void run() {		
//		LOGGER.info("ejecuto despues de la phase de inyeccion de dependencias");
//		
//		//estimo que aca tengo que llamar a la query del userRepository que me vaya a buscar al userAccount con el 
//		//id que yo ya se cual es...?? toy muy equivocado? ya se que me vas a decir que si, porque sos una kaka jaja
//		
//	
//	}
//	
//	public Player createPlayer(String fullUserName, UserAccount userAccount) {
//		Player player = new Player();
//		player.setAddress("");
//		player.setBirthday(null);
//		player.setFullName(fullUserName);
//		player.setDisablingReason("");
//		player.setEmail("");
//		player.setHomePhone("");
//		player.setUserAccount(userAccount);
//		player.setOwnGameSet(null);
//		player.setGuestGameSet(null);
//		
//		playerRepository.save(player);
//		return player;
//	}

}
