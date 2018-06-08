package org.genboard.config;

import org.genboard.model.Actor;
import org.genboard.model.GameSet;
import org.genboard.model.Player;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

@Configuration
public class CustomRepositoryRestConfiguration extends RepositoryRestConfigurerAdapter {
	
	@Value("${rest.base_path}")
    private String base_path;

    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
    	config.exposeIdsFor(Actor.class);
    	config.exposeIdsFor(GameSet.class);
    	config.exposeIdsFor(Player.class);
    	//esto de aca anajo me preocupa, jajaja
    	//despues vemos donde quedan
        //config.setBasePath(this.base_path);
    }
}
