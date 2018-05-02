package org.genboard.repository.rest;

import org.genboard.repository.GameSetRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(path = "gameSet", collectionResourceRel = "gameSets")
public interface GameSetRestRepository extends GameSetRepository {
	

}