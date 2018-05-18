package org.genboard.seeder;

import org.genboard.model.GameSet;
import org.genboard.model.Player;
import org.genboard.repository.GameSetRepository;
import org.genboard.repository.PlayerRepository;
import org.hibernate.annotations.common.util.impl.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class GameSetSeeder {
	
	private static final org.jboss.logging.Logger LOGGER = LoggerFactory.logger(PlayerSeeder.class);
	
	@Autowired
	PlayerRepository playerRepository;

	@Autowired
	GameSetRepository gameSetRepository;
	
	Player owner;
	Player guest1;
	Player guest2;
	Player guest3;

    @EventListener
	private void run(ApplicationReadyEvent event) {		
		LOGGER.info("ejecuto despues de la phase de inyeccion de dependencias");
		owner = playerRepository.findByUsername("carabonita");
		guest1 = playerRepository.findByUsername("laloba");
		guest2 = playerRepository.findByUsername("jefe");
		
		createGameSet("nuevaPartida2", "historia de vida");
	}

	public GameSet createGameSet(String name, String history) {
		GameSet gameSet = new GameSet();
		gameSet.setName(name);
		gameSet.setHistory(history);
		gameSetRepository.save(gameSet);
		
		guest1.getGuestGameSet().add(gameSet);		
		playerRepository.save(guest1);

		guest2.getGuestGameSet().add(gameSet);		
		playerRepository.save(guest2);
		
		gameSet.setOwner(owner);		
		gameSetRepository.save(gameSet);
		return gameSet;
		
	}

}
