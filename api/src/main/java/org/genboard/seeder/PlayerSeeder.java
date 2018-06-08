package org.genboard.seeder;

//import javax.annotation.PostConstruct;
//
//import org.genboard.model.Player;
//import org.genboard.model.UserAccount;
//import org.genboard.repository.PlayerRepository;
//import org.genboard.repository.UserAccountRepository;
//import org.hibernate.annotations.common.util.impl.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;

//@Component
//public class PlayerSeeder {
//	
//	private static final org.jboss.logging.Logger LOGGER = LoggerFactory.logger(PlayerSeeder.class);
//	
//	@Autowired
//	PlayerRepository playerRepository;
//	
//	@Autowired
//	UserAccountRepository userAccountRepository;
//
//	@PostConstruct
//	private void run() {		
//		LOGGER.info("ejecuto despues de la phase de inyeccion de dependencias");
//		
//		UserAccount laloba = userAccountRepository.getOne("laloba");
//		UserAccount jefe = userAccountRepository.getOne("jefe");
//		
//		createPlayer("laloba", laloba);
//		createPlayer("jefe", jefe);
//	
//	}
//	
//	public Player createPlayer(String fullUserName, UserAccount userAccount) {
//		Player player = new Player();
//		player.setAddress(null);
//		player.setBirthday(null);
//		player.setFullName(fullUserName);
//		player.setDisablingReason("");
//		player.setEmail("prueba@gmail.com");
//		player.setHomePhone(null);
//		player.setUserAccount(userAccount);
//		player.setOwnGameSet(null);
//		player.setGuestGameSet(null);
//		
//		playerRepository.save(player);
//		return player;
//	}

//}
