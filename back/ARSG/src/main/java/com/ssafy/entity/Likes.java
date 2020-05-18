package com.ssafy.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;

@Entity
@Getter @Setter
@Table(name = "likes")
public class Likes {
	@Id @GeneratedValue
	@JsonIgnore
	private Long id;
	
	@NonNull
	@Column(name="user_id", nullable=false)
	private Long uId;
	@NonNull
	@Column(name="saegim_id", nullable=false)
	private Long sId;
}