package com.ssafy.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.repositories.LikesRepository;
import com.ssafy.service.CommentService;
import com.ssafy.service.LikesService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@RequestMapping("/comment")
public class CommentRestController extends EntityRestController{
	@Autowired
	private CommentService commentService;
	
	@ApiOperation("모든 댓글 정보 검색")
	@GetMapping("/")
	public ResponseEntity<Map<String, Object>> getLikes() throws Exception{
		return handleSuccess(commentService.getComments());
	}
	@ApiOperation("userId으로 댓글 정보 검색")
	@GetMapping("/userid/{userid}")
	public ResponseEntity<Map<String, Object>> getLikeByuId(@PathVariable("userid") long userId) throws Exception{
		return handleSuccess(commentService.getCommentsByUserId(userId));
	}
	@ApiOperation("saegimId으로 댓글 정보 검색")
	@GetMapping("/saegimid/{saegimid}")
	public ResponseEntity<Map<String, Object>> getLikeBysId(@PathVariable("saegimid") long saegimId) throws Exception{
		return handleSuccess(commentService.getCommentsBySaegimId(saegimId));
	}
}
