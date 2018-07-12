package org.genboard.controller;

import java.util.List;

import org.genboard.model.GameSet;
import org.genboard.model.Throw;
import org.genboard.repository.ThrowRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${rest.base_path}/throw")
public class ThrowRestController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ThrowRestController.class);
	
    @Autowired
    private ThrowRepository throwRepository;
	
	@RequestMapping(
		value = "", 
		method = RequestMethod.POST)
    public Throw create(@RequestBody Throw throw1) {
        LOGGER.info("iniciativa creada" );
        return throwRepository.save(throw1);
    }
	
	@ResponseBody
	@RequestMapping(
			value = "getAll", 
			method = RequestMethod.GET)
	    public List<Throw> getAllGameSet() {
	        LOGGER.info("obteniendo tiradas");
			return throwRepository.findAll();
	    }
	
}


