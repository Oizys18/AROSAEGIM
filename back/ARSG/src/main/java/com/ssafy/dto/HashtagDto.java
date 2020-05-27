package com.ssafy.dto;

import com.ssafy.configuration.ConfigurationUtilFactory;
import com.ssafy.entity.Hashtag;
import com.ssafy.entity.Tagging;

import lombok.*;

@NoArgsConstructor
@RequiredArgsConstructor
@Getter @Setter
public class HashtagDto {
	@NonNull
	private Long id;
	@NonNull
	private String name;
	
	public static HashtagDto of(Tagging tagging) {
		return ConfigurationUtilFactory.modelmapper().map(tagging.getHASHTAG(), HashtagDto.class);
	}
}
