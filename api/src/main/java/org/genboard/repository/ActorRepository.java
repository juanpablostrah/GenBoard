package org.genboard.repository;

import org.genboard.model.Actor;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface ActorRepository extends AbstractRepository<Actor, Long> {

	
	
}