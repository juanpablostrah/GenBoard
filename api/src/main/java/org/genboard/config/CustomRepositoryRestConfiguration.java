package org.genboard.config;

import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.ConversionService;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

@Configuration
public class CustomRepositoryRestConfiguration extends RepositoryRestMvcConfiguration {


	public CustomRepositoryRestConfiguration(
		ApplicationContext context,
		ObjectFactory<ConversionService> conversionService
	) {
		super(context, conversionService);
	}

	@Value("${rest.base_path}")
    private String base_path;

    protected void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
    	
//        config.exposeIdsFor(UserAccount.class);

        config.setBasePath(this.base_path);
    }
}
