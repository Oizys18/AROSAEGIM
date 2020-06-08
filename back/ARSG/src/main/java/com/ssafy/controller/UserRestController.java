package com.ssafy.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.dto.LoginFormDto;
import com.ssafy.dto.UserDto;
import com.ssafy.dto.UserFormDto;
import com.ssafy.service.CommentService;
import com.ssafy.service.LikesService;
import com.ssafy.service.UserService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@RequestMapping("/users")
public class UserRestController extends EntityRestController{
	@Autowired
	private UserService userService;
	@Autowired
	private CommentService commentService;
	@Autowired
	private LikesService likesService;

	@ApiOperation("모든 회원 정보 List")
	@GetMapping()
	public ResponseEntity<Map<String, Object>> getUsers() throws Exception{
		return handleSuccess(userService.getUsers());
	}
	@ApiOperation("user 정보로 회원 등록")
	@PostMapping()
	public ResponseEntity<Map<String, Object>> postUser(@RequestBody UserFormDto userFormDto) throws Exception{
		System.out.println("======================== UserFormDto ========================");
		System.out.println(userFormDto.getEmail());
		System.out.println(userFormDto.getName());
		System.out.println(userFormDto.getPassword());
		System.out.println(userFormDto.getProfileImage().length());
		return handleSuccess(userService.postUser(userFormDto));
	}
	@ApiOperation("userId으로 회원 정보 검색")
	@GetMapping("/{userid}")
	public ResponseEntity<Map<String, Object>> getUser(@PathVariable("userid") long userid) throws Exception{
		return handleSuccess(userService.getUser(userid));
	}
	@ApiOperation("userId으로 회원 정보 수정")
	@PutMapping("/{userid}")
	public ResponseEntity<Map<String, Object>> putUser(@PathVariable("userid") long userid, @RequestBody UserFormDto userFormDto) throws Exception{
		return handleSuccess(userService.putUser(userid, userFormDto));
	}
	@ApiOperation("userId으로 회원 정보 삭제")
	@DeleteMapping("/{userid}")
	public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable("userid") long userid) throws Exception{
		return handleSuccess(userService.deleteUser(userid));
	}
	// ===================== 사용자 댓글 =====================
	@ApiOperation("userId로 댓글 정보 검색")
	@GetMapping("/{userid}/comments")
	public ResponseEntity<Map<String, Object>> getCommentsByUserId(@PathVariable("userid") long userId) throws Exception{
		return handleSuccess(commentService.getCommentsByUserId(userId));
	}
	// ===================== 사용자 좋아요 =====================
	@ApiOperation("userId로 좋아요 정보 검색")
	@GetMapping("/{userid}/likes")
	public ResponseEntity<Map<String, Object>> getLikesByUserId(@PathVariable("userid") long userId) throws Exception{
		return handleSuccess(likesService.getLikesByUserId(userId));
	}
	
	@ApiOperation("userEmail으로 회원 정보 검색")
	@GetMapping("/email")
	public ResponseEntity<Map<String, Object>> getUserByEmail(@RequestParam String email) throws Exception{
		return handleSuccess(userService.getUserByEmail(email));
	}
	@ApiOperation("userName으로 회원 정보 검색")
	@GetMapping("/name")
	public ResponseEntity<Map<String, Object>> getUserByName(@RequestParam String name) throws Exception{
		return handleSuccess(userService.getUserByName(name));
	}
	@ApiOperation("모든 회원의 수")
	@GetMapping("/count")
	public ResponseEntity<Map<String, Object>> getUserCount() throws Exception{
		return handleSuccess(userService.getUserCount());
	}
	// 추가
	@ApiOperation("id, pw로 로그인")
	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> loginUser(@RequestBody LoginFormDto loginFormDto) throws Exception{
		UserDto tmp = userService.loginUser(loginFormDto);
		if(tmp != null)
			return handleSuccess(tmp);
		else
			return handleSuccess("login fail");
	}
}
