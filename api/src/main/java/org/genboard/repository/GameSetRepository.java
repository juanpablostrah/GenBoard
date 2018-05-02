package org.genboard.repository;

import org.genboard.model.GameSet;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.rest.core.annotation.RestResource;


@NoRepositoryBean
public interface GameSetRepository extends AbstractRepository<GameSet, Long> {

	@RestResource(exported = false)
	@Query("select d from GameSet d where d.name = ?1")
	GameSet findByName(String name);

}