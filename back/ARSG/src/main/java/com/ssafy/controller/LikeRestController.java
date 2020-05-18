package com.ssafy.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.repositories.LikeRepository;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@RequestMapping("/like")
public class LikeRestController extends EntityRestController{
	@Autowired
	private LikeRepository likeRepository;
	
	@ApiOperation("userId으로 좋아요 정보 검색")
	@GetMapping("/uid/{uid}")
	public ResponseEntity<Map<String, Object>> getLikeByuId(@PathVariable("uid") long userid) throws Exception{
		return handleSuccess(likeRepository.findByuId(userid));
	}
	@ApiOperation("saegimId으로 좋아요 정보 검색")
	@GetMapping("/sid/{sid}")
	public ResponseEntity<Map<String, Object>> getLikeBysId(@PathVariable("sid") long saegimId) throws Exception{
		return handleSuccess(likeRepository.findBysId(saegimId));
	}
}
