package com.ssafy.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;

@Entity
@Getter @Setter
@Table(name = "tagging")
public class Tagging {
	@Id @GeneratedValue
	@JsonIgnore
	private Long id;
	
	@NonNull
	@Column(name="tag_id", nullable=false)
	private Long tId;
	@NonNull
	@Column(name="saegim_id", nullable=false)
	private Long sId;
}