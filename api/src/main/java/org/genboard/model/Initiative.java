package org.genboard.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

@Entity
public class Initiative {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Long id;
	
	private Integer turn;	
	
	@OneToMany(mappedBy = "initiative")
	@LazyCollection(LazyCollectionOption.FALSE)
	private List<Throw> initiativeThrow;

	public Initiative() {
		super();
	}

	public Integer getTurn() {
		return turn;
	}

	public void setTurn(Integer turn) {
		this.turn = turn;
	}

	public List<Throw> getInitiativeThrow() {
		return initiativeThrow;
	}

	public void setInitiativeThrow(List<Throw> initiativeThrow) {
		this.initiativeThrow = initiativeThrow;
	}

	public void order() {
		//personList.sort((p1, p2) -> p1.firstName.compareTo(p2.firstName));
		getInitiativeThrow().sort((Throw t1,Throw t2) -> t1.getResult().compareTo(t2.getResult()));
		
		
	}
		

}
