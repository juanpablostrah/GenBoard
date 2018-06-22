package org.genboard.repository.rest;

import org.genboard.repository.CoordRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "coord", collectionResourceRel = "coords")
public interface CoordRestRepository extends CoordRepository {
	

}
