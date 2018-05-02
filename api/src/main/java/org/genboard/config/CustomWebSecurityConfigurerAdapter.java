package org.genboard.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Order(1)
@Configuration
@EnableWebSecurity
public class CustomWebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter{
	
    @Value("${rest.base_path}")
    private String base_path;

    @Value("${rest.public_path}")
    private String public_path;
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //this should be handled from AngularJS
        http.csrf().disable();

        // do not create jsessionID cookie
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // Seguridad http
        http.authorizeRequests()
            .antMatchers("/**/sessionUser/**").hasRole("ADMIN")
            .antMatchers("/**/sessionManager/**").hasAnyRole("ADMIN", "ENROLLER")
            .antMatchers("/**/hal-browser/**").hasRole("ADMIN")

            .antMatchers("/**/" + base_path + "/" + public_path + "/user/signup/**").anonymous()
            .antMatchers("/**/" + base_path + "/" + public_path + "/user/password/recovery/**").anonymous()

            .antMatchers("/**/" + base_path + "/files/**").permitAll()
            .antMatchers("/**/" + base_path + "/images/**").permitAll()
            
            .antMatchers("/**/" + base_path + "/gameSet/**").permitAll()
            .antMatchers("/**/" + base_path + "/player/**").permitAll()
            
            .antMatchers("/**/" + "/player/**").permitAll()
            
            .anyRequest().authenticated()
            .and().httpBasic();
    	}
}
