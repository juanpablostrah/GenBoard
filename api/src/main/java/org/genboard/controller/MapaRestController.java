package org.genboard.controller;

import org.genboard.model.Mapa;
import org.genboard.repository.CoordRepository;
import org.genboard.repository.MapaRepository;
import org.genboard.repository.TokenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${rest.base_path}/mapa")
public class MapaRestController {

	private static final Logger LOGGER = LoggerFactory.getLogger(MapaRestController.class);

	@Autowired
	private MapaRepository mapaRepository;
	
	@ResponseBody
	@RequestMapping(value = "", method = RequestMethod.POST)
	public Mapa create(@RequestBody Mapa mapa) {
		return mapaRepository.save(mapa);
	}	
}
