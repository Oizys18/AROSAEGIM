package com.ssafy.dto;

import com.ssafy.entity.Tagging;
import com.ssafy.util.UtilFactory;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@RequiredArgsConstructor
@Getter @Setter
public class HashtagDto {
	@NonNull
	private Long id;
	@NonNull
	private String name;
	
	public static HashtagDto of(Tagging tagging) {
		return UtilFactory.getModelMapper().map(tagging.getHASHTAG(), HashtagDto.class);
	}
}
