package com.ssafy.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.repositories.TestuserRepository;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RequestMapping("/")
@RestController
public class TestRestController {
	@Autowired
    private TestuserRepository userRepository;
	
	@ExceptionHandler
	public ResponseEntity<Map<String, Object>> handle(Exception e){
		return handleFail(e.getMessage(), HttpStatus.OK);
	}
	
	public ResponseEntity<Map<String, Object>> handleSuccess(Object data){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("state", "ok");
		resultMap.put("data", data);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	public ResponseEntity<Map<String, Object>> handleFail(Object data, HttpStatus state){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("state", "fail");
		resultMap.put("data", data);
		return new ResponseEntity<Map<String,Object>>(resultMap, state); 
	}
	
//	@ApiOperation("post 요청에 관한 인삿말을 출력한다")
	@PostMapping("/hello")
	public ResponseEntity<Map<String, Object>> getHello() throws Exception{
		return handleSuccess("POST Hello World");
	}
	
//	@ApiOperation("get 요청에 관한 인삿말을 출력한다")
	@GetMapping("/")
	public ResponseEntity<Map<String, Object>> postHello() throws Exception{
		return handleSuccess("GET Hello World");
	}
	
	@GetMapping("/testuser")
	public ResponseEntity<Map<String, Object>> getTestuser() throws Exception{
		return handleSuccess(userRepository.findByName("AAA"));
	}
}
