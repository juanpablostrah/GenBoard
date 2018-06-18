package org.genboard.repository.rest;

import org.genboard.repository.ThrowRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "throw", collectionResourceRel = "throws")
public interface ThrowRestRepository extends ThrowRepository {
	

}
