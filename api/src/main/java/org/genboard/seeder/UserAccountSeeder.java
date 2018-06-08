package org.genboard.seeder;

//import javax.annotation.PostConstruct;
//
//import org.genboard.model.UserAccount;
import org.genboard.repository.UserAccountRepository;
//import org.hibernate.annotations.common.util.impl.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserAccountSeeder {

	@Autowired
	private	PasswordEncoder genboardPasswordsEncoder; 
	
	@Autowired
	UserAccountRepository userAccountRepository;


	//private static final org.jboss.logging.Logger LOGGER = LoggerFactory.logger(PlayerSeeder.class);

//	@PostConstruct
//	private void run() {		
//		LOGGER.info("ejecuto despues de la phase de inyeccion de dependencias");
//		createUser("laloba","12345678","");
//		createUser("jefe","12345678","");
//	}
//	
//	private UserAccount createUser(String username, String password, String roles) {
//		UserAccount user = new UserAccount();
//		user.setUsername(username);
//		user.setPassword(genboardPasswordsEncoder.encode(password));
//		user.setRoles(roles);
//		user.setAccountNonExpired(true);
//		user.setAccountNonLocked(true);
//		user.setCredentialsNonExpired(true);
//		user.setEnabled(true);
//		
//		userAccountRepository.save(user);
//		return user;
//	}
}
