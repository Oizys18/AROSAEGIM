package com.ssafy.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;

import com.ssafy.entity.User;
import com.ssafy.util.UtilFactory;

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
	
	private String profileImage;

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
    	ModelMapper modelMapper = UtilFactory.getModelMapper();
    	modelMapper.addMappings(userMap);
    	UserDto dto = modelMapper.map(user, UserDto.class);
    	return dto;
    }
}
