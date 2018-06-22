package org.genboard.repository;

import org.genboard.model.Token;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface TokenRepository extends AbstractRepository<Token, Long> {

	
	
}
