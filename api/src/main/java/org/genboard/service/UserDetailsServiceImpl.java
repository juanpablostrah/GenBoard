package org.genboard.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.genboard.model.UserAccount;
import org.genboard.repository.UserAccountRepository;
import org.hibernate.annotations.common.util.impl.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Transactional
@Service("userDetailsServiceImpl")
public class UserDetailsServiceImpl implements UserDetailsService {

	private static final org.jboss.logging.Logger LOGGER = LoggerFactory.logger(UserDetailsServiceImpl.class);

	protected UserAccountRepository userAccountRepository;

	@Autowired
	public UserDetailsServiceImpl(UserAccountRepository userRepository) {
		this.userAccountRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		LOGGER.debug("loading User by Username: " + username);
		Optional<UserAccount> found = userAccountRepository.findById(username);
		if(found.isPresent()) {
			return found.get();
		}
		throw new UsernameNotFoundException("user does not exist in database");
	}

}

