package com.ssafy.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.dto.LoginFormDto;
import com.ssafy.dto.UserDto;
import com.ssafy.dto.UserFormDto;
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
	public UserDto getUser(Long uId) {
		User user = userRepository.findById(uId);
		Set<Likes> setLikes = likesRepository.findByUserId(user.getId());
		user.setLikes(setLikes);
		UserDto userDto = UserDto.of(user);
		return userDto;
	}
	@Override
	public UserDto getUserByEmail(String email) {
		User user = userRepository.findByEmail(email);
		user.setLikes(likesRepository.findByUserId(user.getId()));
		UserDto userDto = UserDto.of(user);
		return userDto;
	}
	@Override
	public UserDto getUserByName(String name) {
		User user = userRepository.findByName(name);
		user.setLikes(likesRepository.findByUserId(user.getId()));
		UserDto userDto = UserDto.of(user);
		return userDto;
	}
	@Override
	public UserDto postUser(UserFormDto userFormDto) {
		User tmp = userRepository.save(User.of(userFormDto));
		if(tmp!=null) {
			UserDto userDto = UserDto.of(tmp);
//			UserDto userDto = new UserDto(user.getId(), user.getEmail(), user.getName(), user.getPassword());
//			List<LikesDto> likes = userDto.getLikes();
//			for (Likes l : user.getLikes()) {
//				likes.add(new LikesDto(l.getSaegim_id(), l.getUser_id(), l.getUser().getName(), l.getSaegim().getUName()));
//			}
			return userDto;
		} else {
			return null;
		}
	}
	@Override
	public List<UserDto> getUsers() {
		List<UserDto> userDtoList = new ArrayList<UserDto>();
		for (User user : userRepository.findAll()) {
			user.setLikes(likesRepository.findByUserId(user.getId()));
			userDtoList.add(UserDto.of(user));
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
			Set<Likes> setLikes = likesRepository.findByUserId(user.getId());
			user.setLikes(setLikes);
			return UserDto.of(user);
		} else {
			return null; 
		}
	}
	@Override
	public UserDto putUser(Long userid, UserFormDto userFormDto) {
		if(userRepository.findById(userid) != null) {
			User user = User.of(userFormDto);
			user.setId(userid);
			userRepository.save(user);
			UserDto userDto = UserDto.of(user);
			return userDto;
		} else {
			return null;
		}
	}
	@Override
	public Long deleteUser(Long userid) {
		return userRepository.removeById(userid);
	}
}
