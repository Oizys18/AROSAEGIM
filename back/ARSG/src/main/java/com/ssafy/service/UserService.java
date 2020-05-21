package com.ssafy.service;

import java.util.List;

import com.ssafy.dto.LoginFormDto;
import com.ssafy.dto.UserDto;
import com.ssafy.entity.User;

public interface UserService {
	public UserDto getUser(long uId);		// user_id로 사용자 찾기
	public UserDto getUser(String email);	// email으로 사용자 찾기
	public UserDto postUser(User user);	// 새로운 user 등록
	public List<UserDto> getUsers();		// 모든 user 찾기
	public Long getUserCount();			// 모든 user 갯수
	
	public UserDto loginUser(LoginFormDto loginFormDto);			// 로그인 처리
}
