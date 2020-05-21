package com.ssafy.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.dto.LikesDto;
import com.ssafy.dto.LoginFormDto;
import com.ssafy.dto.UserDto;
import com.ssafy.entity.Likes;
import com.ssafy.entity.User;
import com.ssafy.repositories.LikesRepository;
import com.ssafy.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private LikesRepository likesRepository;
	
	@Override
	public UserDto getUser(long uId) {
		User user = userRepository.findById(uId);
		UserDto userDto = new UserDto(user.getId(), user.getEmail(), user.getName(), user.getPassword());
		List<LikesDto> likes = userDto.getLikes();
		for (Likes l : user.getLikes()) {
			likes.add(new LikesDto(l.getSaegim_id(), l.getUser_id(), l.getUser().getName(), l.getSaegim().getUName()));
		}
		return userDto;
//				.orElseThrow(() -> 
//        		new RestException(HttpStatus.NOT_FOUND, "Not found board"));
	}
	@Override
	public UserDto getUser(String email) {
		User user = userRepository.findByEmail(email);
		UserDto userDto = new UserDto(user.getId(), user.getEmail(), user.getName(), user.getPassword());
		List<LikesDto> likes = userDto.getLikes();
		for (Likes l : user.getLikes()) {
			likes.add(new LikesDto(l.getSaegim_id(), l.getUser_id(), l.getUser().getName(), l.getSaegim().getUName()));
		}
		return userDto;
	}
	@Override
	public UserDto postUser(User user) {
//		user.setName("Test");
		User tmp = userRepository.save(user);
		if(tmp!=null) {
			UserDto userDto = new UserDto(user.getId(), user.getEmail(), user.getName(), user.getPassword());
			List<LikesDto> likes = userDto.getLikes();
			for (Likes l : user.getLikes()) {
				likes.add(new LikesDto(l.getSaegim_id(), l.getUser_id(), l.getUser().getName(), l.getSaegim().getUName()));
			}
			return userDto;
		} else {
			return null;
		}
	}
	@Override
	public List<UserDto> getUsers() {
		List<UserDto> userDtoList = new ArrayList<UserDto>();
		for (User user : userRepository.findAll()) {
			UserDto userDto = new UserDto(user.getId(), user.getEmail(), user.getName(), user.getPassword());
			List<LikesDto> likes = userDto.getLikes();
			for (Likes l : user.getLikes()) {
				likes.add(new LikesDto(l.getSaegim_id(), l.getUser_id(), l.getUser().getName(), l.getSaegim().getUName()));
			}
			userDtoList.add(userDto);
		}
		return userDtoList;
	}
	@Override
	public Long getUserCount() {
		return userRepository.count();
	}
	@Override
	public UserDto loginUser(LoginFormDto loginFormDto) {
		User user = userRepository.findByEmail(loginFormDto.getEmail());
		if(user.getPassword().equals(loginFormDto.getPassword())) {
			UserDto userDto = new UserDto(user.getId(), user.getEmail(), user.getName(), user.getPassword());
			List<LikesDto> likes = userDto.getLikes();
			for (Likes l : user.getLikes()) {
				likes.add(new LikesDto(l.getSaegim_id(), l.getUser_id(), l.getUser().getName(), l.getSaegim().getUName()));
			}
			return userDto;
		} else {
			return null; 
		}
	}
}
