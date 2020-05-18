package com.ssafy.entity;

import javax.persistence.*;

import org.hibernate.annotations.LazyToOne;
import org.hibernate.annotations.LazyToOneOption;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.*;

//@Entity
@Getter @Setter
@Table(name = "likes")
public class Users_Saegim {
	@Id @GeneratedValue
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
	@LazyToOne(value = LazyToOneOption.NO_PROXY)
	@JsonManagedReference
	private User user;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "saegim_id")
	@LazyToOne(value = LazyToOneOption.NO_PROXY)
	@JsonManagedReference
	private Saegim saegim;
	
}
