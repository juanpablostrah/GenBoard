package org.genboard.repository;

import java.util.List;

import org.genboard.model.Mapa;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;

@NoRepositoryBean
public interface MapaRepository extends AbstractRepository<Mapa, Long> {

	@Query("select a from Mapa a where a.gameSet.id = :gameSetId")
    List<Mapa> findByGameSetId(@Param("gameSetId") Long gameSetId);
	
}