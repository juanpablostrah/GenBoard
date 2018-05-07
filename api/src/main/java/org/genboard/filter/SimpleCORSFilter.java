package org.genboard.filter;

import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;

@Component
public class SimpleCORSFilter implements Filter {

	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException,
			ServletException {
		HttpServletResponse response = (HttpServletResponse) res;
		HttpServletRequest request = (HttpServletRequest) req;

		if (request.getHeader("Access-Control-Request-Method") != null && "OPTIONS".equals(request.getMethod())) {
            // CORS "pre-flight" request
            response.addHeader("Access-Control-Allow-Origin",
                    "*");
            response.addHeader("Access-Control-Allow-Methods",
                    "GET, POST, PUT, DELETE, OPTIONS, PATCH");
            response.addHeader("Access-Control-Allow-Headers",
                    "x-requested-with, Authorization, Content-Type, accept");
            response.addHeader("Access-Control-Max-Age",
                    "1800");//30 min
            response.setHeader("Access-Control-Expose-Headers", "Location");
        }
		else {
		    
    		response.setHeader("Access-Control-Allow-Origin", "*");
     		//response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
    		response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE, PATCH");
    		response.setHeader("Access-Control-Max-Age", "3600");
            //response.setHeader("Access-Control-Allow-Credentials", "true");
    		response.setHeader("Access-Control-Allow-Headers", "x-requested-with, Authorization");
            response.setHeader("Access-Control-Expose-Headers", "Location");
            //response.setHeader("Access-Control-Allow-Headers",
            //		"Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
    		chain.doFilter(req, res);
		}
		
	}

	public void init(FilterConfig filterConfig) {
	}

	public void destroy() {
	}
}