package org.genboard.repository.rest;

import org.genboard.repository.InitiativeRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "initiative", collectionResourceRel = "initiatives")
public interface InitiativeRestRepository extends InitiativeRepository {
	

}
