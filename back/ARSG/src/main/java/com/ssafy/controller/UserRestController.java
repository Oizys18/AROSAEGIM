package com.ssafy.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.entity.User;
import com.ssafy.service.UserServiceImpl;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@RequestMapping("/user")
public class UserRestController extends EntityRestController{
	@Autowired
	private UserServiceImpl userService;
	
	@ApiOperation("userId으로 회원 정보 검색")
	@GetMapping("/id/{id}")
	public ResponseEntity<Map<String, Object>> getUser(@PathVariable("id") long userid) throws Exception{
		return handleSuccess(userService.getUser(userid));
	}
	@ApiOperation("userName으로 회원 정보 검색")
	@GetMapping("/name/{name}")
	public ResponseEntity<Map<String, Object>> getUser(@PathVariable("name") String name) throws Exception{
		return handleSuccess(userService.getUser(name));
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
}
