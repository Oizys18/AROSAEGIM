package com.ssafy.entity;

import java.io.Serializable;

import com.google.common.primitives.UnsignedLong;

import lombok.*;

//@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteId implements Serializable {
	private static final long serialVersionUID = 1L;
	@NonNull
	private Long saegim_id;	
	@NonNull
	private Long user_id;
}
