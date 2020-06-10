package com.ssafy.dto;

import com.ssafy.entity.Likes;
import com.ssafy.util.UtilFactory;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class LikesDto {
	private Long saegimId;
	private Long userId;
	private String userName;
	
	public static LikesDto of(Likes likes) {
    	LikesDto dto = UtilFactory.getModelMapper().map(likes, LikesDto.class);
    	dto.setUserName(likes.getUSER().getName());
    	return dto;
    }
}
