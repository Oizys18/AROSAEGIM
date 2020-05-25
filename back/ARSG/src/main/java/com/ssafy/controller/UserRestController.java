package com.ssafy.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.dto.LoginFormDto;
import com.ssafy.dto.UserDto;
import com.ssafy.entity.User;
import com.ssafy.service.UserService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@RequestMapping("/user")
public class UserRestController extends EntityRestController{
	@Autowired
	private UserService userService;
	
	@ApiOperation("userId으로 회원 정보 검색")
	@GetMapping("/id/{id}")
	public ResponseEntity<Map<String, Object>> getUser(@PathVariable("id") long userid) throws Exception{
		return handleSuccess(userService.getUser(userid));
	}
	@ApiOperation("userEmail으로 회원 정보 검색")
	@GetMapping("/email/{email}")
	public ResponseEntity<Map<String, Object>> getUser(@PathVariable("email") String email) throws Exception{
		return handleSuccess(userService.getUser(email));
	}
	@ApiOperation("모든 회원 정보 List")
	@GetMapping("/all")
	public ResponseEntity<Map<String, Object>> getUsers() throws Exception{
		return handleSuccess(userService.getUsers());
	}
	@ApiOperation("모든 회원의 수")
	@GetMapping("/count")
	public ResponseEntity<Map<String, Object>> getUserCount() throws Exception{
		return handleSuccess(userService.getUserCount());
	}
	@ApiOperation("user 정보로 회원 등록")
	@PostMapping("/")
	public ResponseEntity<Map<String, Object>> postUser(User user) throws Exception{
		return handleSuccess(userService.postUser(user));
	}
	// 추가
	@ApiOperation("id, pw로 로그인")
	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> loginUser(LoginFormDto loginFormDto) throws Exception{
		UserDto tmp = userService.loginUser(loginFormDto);
		if(tmp != null)
			return handleSuccess(tmp);
		else
			return handleFail("login fail", HttpStatus.I_AM_A_TEAPOT);
	}
}
