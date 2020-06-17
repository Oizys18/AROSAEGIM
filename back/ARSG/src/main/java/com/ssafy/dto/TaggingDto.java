package com.ssafy.dto;

import com.ssafy.entity.Tagging;
import com.ssafy.util.UtilFactory;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class TaggingDto {
	private Long tagId;
	private Long saegimId;
	
	public static TaggingDto of(Tagging tagging) {
    	TaggingDto dto = UtilFactory.getModelMapper().map(tagging, TaggingDto.class);
    	return dto;
    }
}
