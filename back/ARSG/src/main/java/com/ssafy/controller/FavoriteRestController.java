package com.ssafy.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.repositories.FavoriteRepository;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@RequestMapping("/favorite")
public class FavoriteRestController extends EntityRestController{
	@Autowired
	private FavoriteRepository favoriteRepository;
	
	@ApiOperation("모든 좋아요 정보 검색")
	@GetMapping("/all")
	public ResponseEntity<Map<String, Object>> getLikes() throws Exception{
		return handleSuccess(favoriteRepository.findAll());
	}
	@ApiOperation("userId으로 좋아요 정보 검색")
	@GetMapping("/uid/{uid}")
	public ResponseEntity<Map<String, Object>> getLikeByuId(@PathVariable("uid") long userid) throws Exception{
		return handleSuccess(favoriteRepository.findByuserId(userid));
	}
	@ApiOperation("saegimId으로 좋아요 정보 검색")
	@GetMapping("/sid/{sid}")
	public ResponseEntity<Map<String, Object>> getLikeBysId(@PathVariable("sid") long saegimId) throws Exception{
		return handleSuccess(favoriteRepository.findBysaegimId(saegimId));
	}
}
