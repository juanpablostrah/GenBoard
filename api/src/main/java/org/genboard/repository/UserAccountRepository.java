package org.genboard.repository;

import org.genboard.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource(exported = false)
public interface UserAccountRepository extends JpaRepository<UserAccount, String> {
	
	@RestResource(exported = false)
	@Query("select a from UserAccount a where LOWER(a.username) = LOWER(?1)")
    UserAccount findOneByLowerUsername(String username);

}

