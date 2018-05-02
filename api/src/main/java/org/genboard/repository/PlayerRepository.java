package org.genboard.repository;

import org.genboard.model.Player;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.rest.core.annotation.RestResource;


@NoRepositoryBean
public interface PlayerRepository extends AbstractRepository<Player, Long> {

	@RestResource(exported = false)
	@Query("select d from Player d where d.userAccount.username = ?1") //metodo dinamico
	Player findByUsername(String username);
	
	@RestResource(exported = false)
	@Query("select d from Player d where LOWER(d.fullName) = LOWER(?1)")
	Player findOneByLowerFullName(String fullname);
	
}