package org.genboard.security;

import java.io.IOException;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.PathMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsProcessor;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.servlet.handler.AbstractHandlerMapping;
import org.springframework.web.util.UrlPathHelper;

@Component("restCorsFilter")
public class RestCorsFilter{
	
	@Autowired
	AbstractHandlerMapping requestMappingHandlerMapping;
	
	private CorsProcessor processor;
	private Map<String, CorsConfiguration> corsConfigurations;
	private PathMatcher pathMatcher;
	private UrlPathHelper urlPathHelper;
	
	@PostConstruct
	public void initialize(){
		processor = requestMappingHandlerMapping.getCorsProcessor();
		corsConfigurations = requestMappingHandlerMapping.getCorsConfigurations();
		pathMatcher = new AntPathMatcher();
		urlPathHelper = new UrlPathHelper();
	}
	
	public void doFilterInternal(
		HttpServletRequest request, 
		HttpServletResponse response,
		FilterChain filterChain
	)throws ServletException, IOException {
		if (CorsUtils.isCorsRequest(request)) {
			CorsConfiguration corsConfiguration = this.getCorsConfiguration(request);
			if (corsConfiguration != null) {
				boolean isValid = this.processor.processRequest(corsConfiguration, request, response);
				if (!isValid || CorsUtils.isPreFlightRequest(request)) {
					return;
				}
			}
		}
		filterChain.doFilter(request, response);
	}
	
	public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
		String lookupPath = this.urlPathHelper.getLookupPathForRequest(request);
		for (Map.Entry<String, CorsConfiguration> entry : this.corsConfigurations.entrySet()) {
			if (this.pathMatcher.match(entry.getKey(), lookupPath)) {
				return entry.getValue();
			}
		}
		return null;
	}

}
