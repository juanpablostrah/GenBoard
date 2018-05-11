package org.genboard.exception;

public class PlayerNotFountException extends CustomRuntimeException{

	private static final long serialVersionUID = 1L;
	
	public PlayerNotFountException() {
		super("PLAYER_NOT_FOUND", "");
	}

}
