package org.genboard.model;

import java.util.ArrayList;
import java.util.Comparator;
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
	
	public void nextTurn() {
		turn++;
		if(turn.equals(initiativeThrow.size())){
			turn = 0;
		}
	}
	
	public Throw currentThrow() {
		return initiativeThrow.get(turn);
	}

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
		Comparator<Throw> orderThrowListLessToGreater = (throw1, throw2)->throw1.getResult().compareTo(throw2.getResult());
		this.getInitiativeThrow().sort(orderThrowListLessToGreater.reversed());
		
		//getInitiativeThrow().sort((Throw t1,Throw t2) -> t1.getResult().compareTo(t2.getResult()));	
		
	}

	public List<Long> getActors() {
		List<Long> actorsId = new ArrayList<>();
		for (Throw throw1 : this.getInitiativeThrow()) {
			actorsId.add(throw1.getActor().getId());
		}
		return actorsId;		
	}
		

}
