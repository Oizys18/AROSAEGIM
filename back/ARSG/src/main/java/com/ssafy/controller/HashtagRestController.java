package com.ssafy.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.service.HashtagService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController(value = "Hello I'm hashtag")
@RequestMapping()
public class HashtagRestController extends EntityRestController{
	@Autowired
	private HashtagService hashtagService;
	
	@ApiOperation("모든 태그 검색")
	@GetMapping("/hashtags")
	public ResponseEntity<Map<String, Object>> getHashtags() throws Exception{
		return handleSuccess(hashtagService.getHashtags());
	}
	@ApiOperation("tagId으로 태깅 정보 검색")
	@GetMapping("/taggings/tagid/{tagid}")
	public ResponseEntity<Map<String, Object>> getTaggingsByTagId(@PathVariable("tagid") long tagId) throws Exception{
		return handleSuccess(hashtagService.getTaggingsByTagId(tagId));
	}
	@ApiOperation("saegimId으로 태깅 정보 검색")
	@GetMapping("/taggings/saegimid/{saegimid}")
	public ResponseEntity<Map<String, Object>> getTaggingsBySaegimId(@PathVariable("saegimid") long saegimId) throws Exception{
		return handleSuccess(hashtagService.getTaggingsBySaegimId(saegimId));
	}
}
