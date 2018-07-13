package org.genboard.repository.rest;

import org.genboard.repository.MapaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "mapa", collectionResourceRel = "mapas")
public interface MapaRestRepository extends MapaRepository {
	

}
