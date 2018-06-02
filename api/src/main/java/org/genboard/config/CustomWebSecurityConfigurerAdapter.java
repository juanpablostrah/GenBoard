package org.genboard.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Order(1)
@Configuration
@EnableWebSecurity
public class CustomWebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter{
	
	@Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(genboardPasswordsEncoder());
    }

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

        http.cors();
        // Seguridad http
        http.authorizeRequests()
            .antMatchers(HttpMethod.OPTIONS, "**").permitAll()
            .antMatchers("/**/sessionUser/**").hasRole("ADMIN")
            .antMatchers("/**/sessionManager/**").hasAnyRole("ADMIN", "ENROLLER")
           
            .antMatchers(base_path + "/gameSet/**").permitAll()
            .antMatchers(base_path + "/player/**").authenticated()
            .antMatchers(base_path + "/actor/**").permitAll()
            .antMatchers(base_path + "/auth/**").permitAll()
            .antMatchers(base_path + "/socket/**").permitAll()
            
            //.antMatchers("**/player/**").permitAll()
            //.antMatchers("**/gameSet/**").permitAll()
            
            .anyRequest().permitAll()
            .and().httpBasic();
        
    }
    
    
    @Bean
    public PasswordEncoder genboardPasswordsEncoder() {
        return new BCryptPasswordEncoder();
    }

}
