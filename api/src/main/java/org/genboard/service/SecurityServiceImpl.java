package org.genboard.service;


import java.util.Optional;

import org.genboard.model.UserAccount;
import org.genboard.repository.UserAccountRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service("securityservice")
public class SecurityServiceImpl implements ISecurityService {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(SecurityServiceImpl.class);

    @Autowired
    private UserAccountRepository userAccountRepository;

	public String getLoggedUsername() {
		Authentication authentication = getAuthentication();
		if (authentication == null) {
			return null;
		}
		return authentication.getName();
	}
	
	public UserAccount getLoggedUser() {
		String username = getLoggedUsername();
		if (username != null) {
			Optional<UserAccount> found = userAccountRepository.findById(username);
			if(found.isPresent()) {
				return found.get();
			}
		} 
		return null;
	}
	
	private Authentication getAuthentication() {
		SecurityContext context = SecurityContextHolder.getContext();
		if (context == null) {
			return null;
		}
		Authentication authentication = context.getAuthentication();
		return authentication;
	}

	public boolean hasRole(String role) {
		return hasAnyRole(role);
	}

	public boolean hasAnyRole(String... roles) {
		UserAccount userAccount = getLoggedUser();
		if (userAccount == null) {
			return false;
		}
		String[] userRoles = userAccount.getRolesAsArray();
		if (userRoles == null) {
			return false;
		}
		for (String roleToFind : roles) {
			for(String userRole : userRoles){
				if (userRole.equals(roleToFind)) {
					return true;
				}
			}
		}
		return false;
	}
	

}
