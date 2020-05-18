package com.ssafy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.entity.User;
import com.ssafy.repositories.LikeRepository;
import com.ssafy.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private LikeRepository likeRepository;
	
	@Override
	public User getUser(long uId) {
		User user = userRepository.findById(uId);
		return user;
//				.orElseThrow(() -> 
//        		new RestException(HttpStatus.NOT_FOUND, "Not found board"));
	}
	@Override
	public User getUser(String name) {
		return userRepository.findByName(name);
	}
	@Override
	public User postUser(User user) {
//		user.setName("Test");
		return userRepository.save(user);
	}
	@Override
	public List<User> getUsers() {
		return userRepository.findAll();
	}
	@Override
	public Long getUserCount() {
		return userRepository.count();
	}
}
