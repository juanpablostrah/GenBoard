package org.genboard.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.genboard.patterns.DPattern;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Player {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Long id;
    
    @OneToOne
    @JsonIgnore
    @JoinColumn(name="user_account_username")
    private UserAccount userAccount;
    
    @NotNull
    @Size(min = 3, max=50)
    private String fullName;
    
	@Temporal(javax.persistence.TemporalType.DATE)
    @Column(name="since")
    private Date since = new Date(System.currentTimeMillis());
    
    @Pattern(
    regexp = DPattern.ADDRESS_REGEXP,
    message = DPattern.ADDRESS_MSG)
    public String address;
    
    @Pattern(
    regexp=DPattern.EMAIL_REGEXP,
    message=DPattern.EMAIL_MSG)
    private String email;
    
    @Pattern(
    regexp=DPattern.MOBILE_PHONE_REGEXP,
    message=DPattern.MOBILE_PHONE_MSG)
    private String mobilePhone;
    
    @Pattern(
    regexp=DPattern.HOME_PHONE_REGEXP,
    message=DPattern.HOME_PHONE_MSG)
    private String homePhone;
    
    @Past
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date birthday;

    @OneToMany(mappedBy = "owner", targetEntity = GameSet.class)
    private List<GameSet> ownGameSet;
    
    @ManyToMany(fetch=FetchType.EAGER)
	@JoinTable(name = "game_set_guest", 
	  joinColumns = @JoinColumn(name = "player_id"), 
	  inverseJoinColumns = @JoinColumn(name = "game_set_id"))
    private List<GameSet> guestGameSet;

    @Enumerated(value = EnumType.STRING)
    private PlayerState playerState = PlayerState.NEW;
    
    @OneToMany(mappedBy = "player", targetEntity = Actor.class)
    private List<Actor> actors;
    
    private String disablingReason;
    
    public PlayerState getPlayerState() {
		return playerState;
	}

	public void setPlayerState(PlayerState playerState) {
		this.playerState = playerState;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDisablingReason() {
		return disablingReason;
	}

	public void setDisablingReason(String disablingReason) {
		this.disablingReason = disablingReason;
	}

	@Transient
    public String getUsername() {
    	return userAccount.getUsername();
    }
    
    @Transient
    public boolean isEnabled() {
    	return userAccount.isEnabled();
    }

    public List<GameSet> getGuestGameSet() {
		return guestGameSet;
	}

	public void setGuestGameSet(List<GameSet> guestGameSet) {
		this.guestGameSet = guestGameSet;
	}


	public UserAccount getUserAccount() {
		return userAccount;
	}

	public List<GameSet> getOwnGameSet() {
		return ownGameSet;
	}

	public void setOwnGameSet(List<GameSet> ownGameSet) {
		this.ownGameSet = ownGameSet;
	}

	public void setUserAccount(UserAccount userAccount) {
		this.userAccount = userAccount;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public Date getSince() {
		return since;
	}

	public void setSince(Date since) {
		this.since = since;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobilePhone() {
		return mobilePhone;
	}

	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}

	public String getHomePhone() {
		return homePhone;
	}

	public void setHomePhone(String homePhone) {
		this.homePhone = homePhone;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}



    
}