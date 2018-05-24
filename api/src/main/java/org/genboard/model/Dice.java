package org.genboard.model;

public class Dice {
	
	private int value;
	private DiceType diceType;
	
	public Dice() {
		super();
	}

	public int getValue() {
		return value;
	}

	public void setValue(int value) {
		this.value = value;
	}

	public DiceType getDiceType() {
		return diceType;
	}

	public void setDiceType(DiceType diceType) {
		this.diceType = diceType;
	}
	

}
