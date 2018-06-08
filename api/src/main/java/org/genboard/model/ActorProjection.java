package org.genboard.model;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "actorProjection", types = Actor.class)
public interface ActorProjection {

	Long getId();
	
	ActorType getTipoActor();
	
	String getName();
	
}
