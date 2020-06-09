package com.ssafy.dto;

import org.modelmapper.PropertyMap;

import com.ssafy.configuration.ConfigurationUtilFactory;
import com.ssafy.entity.Likes;
import com.ssafy.entity.Saegim;
import com.ssafy.entity.User;

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
//		PropertyMap<Likes, LikesDto> likesMap = new PropertyMap<Likes, LikesDto>() {
//    		@Override
//    		protected void configure() {
//    			User user = likes.getUser();
//    			map().setUser_name(user.getName());
//    		}
//    	};
//    	if(ConfigurationUtilFactory.modelmapper().getTypeMap(Likes.class, LikesDto.class) == null)
//    		ConfigurationUtilFactory.modelmapper().addMappings(likesMap);
    	LikesDto dto = ConfigurationUtilFactory.modelmapper().map(likes, LikesDto.class);
    	dto.setUserName(likes.getUSER().getName());
    	return dto;
    }
}
