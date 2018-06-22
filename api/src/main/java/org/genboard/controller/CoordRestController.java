package org.genboard.controller;

import org.genboard.model.Coord;
import org.genboard.repository.CoordRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${rest.base_path}/coord")
public class CoordRestController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(CoordRestController.class);
	
    @Autowired
    private CoordRepository coordRepository;
	
	@RequestMapping(
		value = "", 
		method = RequestMethod.POST)
    public Coord create(@RequestBody Coord coord) {
        LOGGER.info("coordenada creada" );
        return coordRepository.save(coord);
    }
	
}