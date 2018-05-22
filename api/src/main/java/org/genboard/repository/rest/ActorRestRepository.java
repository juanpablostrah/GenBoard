package org.genboard.repository.rest;

import org.genboard.repository.ActorRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "player", collectionResourceRel = "players")
public interface ActorRestRepository extends ActorRepository {
	

}
