package com.ssafy.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.PropertyMap;

import com.ssafy.configuration.ConfigurationUtilFactory;
import com.ssafy.entity.User;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@RequiredArgsConstructor
@Getter @Setter
public class UserDto {
	@NonNull
	private Long id;
	@NonNull
	private String email;
	@NonNull
	private String name;
	@NonNull
	private String password;

	private List<LikesDto> likes = new ArrayList<LikesDto>();

    public static UserDto of(User user) {
    	PropertyMap<User, UserDto> userMap = new PropertyMap<User, UserDto>() {
    		@Override
    		protected void configure() {
    			List<LikesDto> likesDto
    			= user.getLikes().stream()
    			.map(likes->LikesDto.of(likes))
    			.collect(Collectors.toList());
    			
    			map().setLikes(likesDto);
    		}
    	};
    	if(ConfigurationUtilFactory.modelmapper().getTypeMap(User.class, UserDto.class) == null)
    		ConfigurationUtilFactory.modelmapper().addMappings(userMap);
    	UserDto dto = ConfigurationUtilFactory.modelmapper().map(user, UserDto.class);
    	return dto;
    }
}
