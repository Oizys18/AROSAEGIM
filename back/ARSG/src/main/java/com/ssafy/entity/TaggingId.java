package com.ssafy.entity;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@NoArgsConstructor
@AllArgsConstructor
public class TaggingId implements Serializable{
	private static final long serialVersionUID = 1L;
	@NonNull
	private Long saegimId;	
	@NonNull
	private Long tagId;
}