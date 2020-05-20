package com.ssafy.entity;

import java.io.Serializable;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
public class TaggingId implements Serializable{
	private static final long serialVersionUID = 1L;
	@NonNull
	private Long saegim_id;	
	@NonNull
	private Long tag_id;
}