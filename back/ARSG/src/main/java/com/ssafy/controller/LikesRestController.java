package com.ssafy.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.service.LikesService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@RequestMapping("/likes")
public class LikesRestController extends EntityRestController{
	@Autowired
	private LikesService likesService;
	
	@ApiOperation("모든 좋아요 정보 검색")
	@GetMapping()
	public ResponseEntity<Map<String, Object>> getLikes() throws Exception{
		return handleSuccess(likesService.getLikes());
	}
	@ApiOperation("userId으로 좋아요 정보 검색")
	@GetMapping("/userid/{userid}")
	public ResponseEntity<Map<String, Object>> getLikeByuId(@PathVariable("userid") long userId) throws Exception{
		return handleSuccess(likesService.getLikesByUserId(userId));
	}
	@ApiOperation("saegimId으로 좋아요 정보 검색")
	@GetMapping("/saegimid/{saegimid}")
	public ResponseEntity<Map<String, Object>> getLikeBysId(@PathVariable("saegimid") long saegimId) throws Exception{
		return handleSuccess(likesService.getLikesBySaegimId(saegimId));
	}
}
