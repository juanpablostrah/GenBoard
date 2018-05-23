package org.genboard.seeder;

import java.util.Optional;

import javax.annotation.PostConstruct;

import org.genboard.model.Player;
import org.genboard.model.UserAccount;
import org.genboard.repository.PlayerRepository;
import org.genboard.repository.UserAccountRepository;
import org.hibernate.annotations.common.util.impl.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserSeeder {
	
	@Autowired
	private	PasswordEncoder genboardPasswordsEncoder; 
	
	@Autowired
	UserAccountRepository userAccountRepository;
	
	@Autowired
	PlayerRepository playerRepository;


	private static final org.jboss.logging.Logger LOGGER = LoggerFactory.logger(UserSeeder.class);

//	@PostConstruct
//	private void run() {		
//		LOGGER.info("ejecuto despues de la phase de inyeccion de dependencias");
//		
//		UserAccount carabonita = null;
//		carabonita = createUser("carabonita","12345678","");
//		
		
//		Optional<Player> player = playerRepository.findById((long) 2);
//		if(!player.isPresent()) {
//			if(userAccount != null) {
//				createPlayer("carabonita", userAccount.get());
//			}
//			else {
//				createPlayer("carabonita", carabonita);
//			}	
//		}
		//UserAccount juampi = createUser("juampi","123456","");
		//createPlayer("juampi", juampi);
		
//	}
	
	private UserAccount createUser(String username, String password, String roles) {
		UserAccount user = new UserAccount();
		user.setUsername(username);
		user.setPassword(genboardPasswordsEncoder.encode(password));
		user.setRoles(roles);
		user.setAccountNonExpired(true);
		user.setAccountNonLocked(true);
		user.setCredentialsNonExpired(true);
		user.setEnabled(true);
		LOGGER.info("creando userAccount");
		userAccountRepository.save(user);
		return user;
	}

	public Player createPlayer(String fullUserName, UserAccount userAccount) {
		Player player = new Player();
		player.setAddress(null);
		player.setBirthday(null);
		player.setFullName(fullUserName);
		player.setDisablingReason("");
		player.setEmail("prueba@gmail.com");
		player.setHomePhone(null);
		player.setUserAccount(userAccount);
		player.setOwnGameSet(null);
		player.setGuestGameSet(null);
		LOGGER.info("creando player");
		playerRepository.save(player);
		return player;
	}
	
}
