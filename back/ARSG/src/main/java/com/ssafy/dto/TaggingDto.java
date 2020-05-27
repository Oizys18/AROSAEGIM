package com.ssafy.dto;

import org.modelmapper.PropertyMap;

import com.ssafy.configuration.ConfigurationUtilFactory;
import com.ssafy.entity.Likes;
import com.ssafy.entity.Saegim;
import com.ssafy.entity.Tagging;
import com.ssafy.entity.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class TaggingDto {
	private Long saegimId;
	private Long tagId;
	
	public static TaggingDto of(Tagging tagging) {
    	TaggingDto dto = ConfigurationUtilFactory.modelmapper().map(tagging, TaggingDto.class);
    	return dto;
    }
}
