package org.genboard.repository;

import org.genboard.model.Initiative;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface InitiativeRepository extends AbstractRepository<Initiative, Long>{

}
