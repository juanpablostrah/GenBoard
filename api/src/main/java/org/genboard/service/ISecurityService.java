package org.genboard.service;

import org.genboard.model.UserAccount;

public interface ISecurityService {

	boolean hasAnyRole(String... roles);

	UserAccount getLoggedUser();

	String getLoggedUsername();

}
