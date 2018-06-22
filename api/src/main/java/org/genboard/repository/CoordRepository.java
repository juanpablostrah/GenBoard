package org.genboard.repository;

import org.genboard.model.Coord;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface CoordRepository extends AbstractRepository<Coord, Long> {

	
	
}