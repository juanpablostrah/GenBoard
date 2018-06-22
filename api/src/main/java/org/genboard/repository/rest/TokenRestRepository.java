package org.genboard.repository.rest;

import org.genboard.repository.TokenRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "token", collectionResourceRel = "tokens")
public interface TokenRestRepository extends TokenRepository {
	

}