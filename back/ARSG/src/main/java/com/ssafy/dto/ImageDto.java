package com.ssafy.dto;

import com.ssafy.entity.Image;
import com.ssafy.util.UtilFactory;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor @AllArgsConstructor
@Getter @Setter
public class ImageDto {
	private Long id;
	private Long saegimId;
	private String source;
	
	public static ImageDto of(Image image) {
		ImageDto dto = UtilFactory.getModelMapper().map(image, ImageDto.class);
		return dto;
	}
}
