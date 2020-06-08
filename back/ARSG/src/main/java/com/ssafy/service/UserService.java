package com.ssafy.service;

import java.util.List;

import com.ssafy.dto.LoginFormDto;
import com.ssafy.dto.UserDto;
import com.ssafy.dto.UserFormDto;

public interface UserService {
	public UserDto getUser(Long uId);		// user_id로 사용자 찾기
	public UserDto getUserByEmail(String email);	// email으로 사용자 찾기
	public UserDto getUserByName(String name);
	public UserDto postUser(UserFormDto userFormDto);	// 새로운 user 등록
	public List<UserDto> getUsers();		// 모든 user 찾기
	public Long getUserCount();			// 모든 user 갯수
	
	public UserDto loginUser(LoginFormDto loginFormDto);			// 로그인 처리
	public UserDto putUser(Long userid, UserFormDto userFormDto);
	public Long deleteUser(Long userid);
}
