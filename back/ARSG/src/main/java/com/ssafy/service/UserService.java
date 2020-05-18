package com.ssafy.service;

import java.util.List;

import com.ssafy.entity.User;

public interface UserService {
	public User getUser(long uId);		// user_id로 사용자 찾기
	public User getUser(String name);	// name으로 사용자 찾기
	public User postUser(User user);	// 새로운 user 등록
	public List<User> getUsers();		// 모든 user 찾기
	public Long getUserCount();			// 모든 user 갯수
}
