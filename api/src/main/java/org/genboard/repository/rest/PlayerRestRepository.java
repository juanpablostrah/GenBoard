package org.genboard.repository.rest;

import org.genboard.model.Player;
import org.genboard.repository.PlayerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(path = "player", collectionResourceRel = "players")
public interface PlayerRestRepository extends PlayerRepository {
	
	@Query("SELECT DISTINCT d FROM Player d WHERE LOWER(d.fullName) LIKE CONCAT('%',LOWER(:fullName),'%')")
    Page<Player> findByLikeFullName(@Param("fullName") String fullName, Pageable pageable);

}