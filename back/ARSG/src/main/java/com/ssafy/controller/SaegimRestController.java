package com.ssafy.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.dto.CommentFormDto;
import com.ssafy.dto.SaegimFormDto;
import com.ssafy.entity.Saegim;
import com.ssafy.service.CommentService;
import com.ssafy.service.LikesService;
import com.ssafy.service.SaegimService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@RequestMapping("/saegims")
public class SaegimRestController extends EntityRestController{
	@Autowired
	private SaegimService saegimService;
	@Autowired
	private LikesService likesService;
	@Autowired
	private CommentService commentService;
	
	@ApiOperation("모든 새김 정보 List")
	@GetMapping("/")
	public ResponseEntity<Map<String, Object>> getSaegims() throws Exception{
		return handleSuccess(saegimService.getSaegims());
	}
	@ApiOperation("새로운 새김 등록")
	@PostMapping("/")
	public ResponseEntity<Map<String, Object>> postSaegim(SaegimFormDto saegimFormDto) throws Exception{
		return handleSuccess(saegimService.postSaegim(saegimFormDto));
	}
	@ApiOperation("saegimId로 새김 정보 검색")
	@GetMapping("/{saegimid}")
	public ResponseEntity<Map<String, Object>> getSaegimBySid(@PathVariable("saegimid") long saegimId) throws Exception{
		return handleSuccess(saegimService.getSaegimBySaegimId(saegimId));
	}
	@ApiOperation("saegimId로 새김 정보 수정")
	@PutMapping("/{saegimid}")
	public ResponseEntity<Map<String, Object>> putSaegim(@PathVariable("saegimid") long saegimId, SaegimFormDto saegimFormDto) throws Exception{
		return handleSuccess(saegimService.putSaegim(saegimId, saegimFormDto));
	}
	@ApiOperation("saegimId으로 새김 정보 삭제")
	@DeleteMapping("/{saegimid}")
	public ResponseEntity<Map<String, Object>> deleteSaegimBySid(@PathVariable("saegimid") long saegimId) throws Exception{
		return handleSuccess((saegimService.deleteSaegimBySid(saegimId)>0)?"Remove Success":"Remove Fail");
	}
	@ApiOperation("saegimId로 새김의 세부 정보(본문 및 좋아요, 댓글, 태그) 검색")
	@GetMapping("/{saegimid}/detail")
	public ResponseEntity<Map<String, Object>> getDetailofSaegimBySid(@PathVariable("saegimid") long saegimId) throws Exception{
		return handleSuccess(saegimService.getDetailBySaegimId(saegimId));
	}
	@ApiOperation("모든 새김의 수")
	@GetMapping("/count")
	public ResponseEntity<Map<String, Object>> getSaegimsCount() throws Exception{
		return handleSuccess(saegimService.getSaegimCount());
	}
	@ApiOperation("lat, lng으로 주변 새김 List 검색")
	@GetMapping("/latlng")
	public ResponseEntity<Map<String, Object>> getSaegimsByGeo(@RequestParam double lat, @RequestParam double lng, @RequestParam int meter) throws Exception{
		return handleSuccess(saegimService.getSaegimsByGeo(lat, lng, meter));
	}
	// ===================== 새김 댓글 =====================
	@ApiOperation("saegimId로 댓글 정보 검색")
	@GetMapping("/{saegimid}/comments")
	public ResponseEntity<Map<String, Object>> getCommentsOfSaegimBySid(@PathVariable("saegimid") long saegimId) throws Exception{
		return handleSuccess(commentService.getCommentsBySaegimId(saegimId));
	}
	@ApiOperation("saegimId로 새로운 댓글 등록")
	@PostMapping("/{saegimid}/comments")
	public ResponseEntity<Map<String, Object>> postCommentOfSaegimBySid(@PathVariable("saegimid") long saegimId, CommentFormDto commentFormDto) throws Exception{
		return handleSuccess(commentService.postCommentOfSaegimBySid(saegimId, commentFormDto));
	}
	@ApiOperation("saegimId와 commentID로 댓글 수정")
	@PutMapping("/{saegimid}/comments/{commentid}")
	public ResponseEntity<Map<String, Object>> putCommentOfSaegimBySidnCId(@PathVariable("saegimid") long saegimId, @PathVariable("commentid") long commentId, CommentFormDto commentFormDto) throws Exception{
		return handleSuccess(commentService.putCommentOfSaegimBySidnCId(saegimId, commentId, commentFormDto));
	}
	@ApiOperation("saegimId와 commentID로 댓글 삭제")
	@DeleteMapping("/{saegimid}/comments/{commentid}")
	public ResponseEntity<Map<String, Object>> deleteCommentOfSaegimBySidnCId(@PathVariable("saegimid") long saegimId, @PathVariable("commentid") long commentId) throws Exception{
		return handleSuccess(commentService.deleteCommentOfSaegimBySidnCId(saegimId, commentId));
	}
	// ===================== 새김 좋아요 =====================
	@ApiOperation("saegimId로 좋아요 정보 검색")
	@GetMapping("/{saegimid}/likes")
	public ResponseEntity<Map<String, Object>> getLikesOfSaegimBySid(@PathVariable("saegimid") long saegimId) throws Exception{
		return handleSuccess(likesService.getLikesBySaegimId(saegimId));
	}
	@ApiOperation("saegimId와 userId로 좋아요 정보 등록")
	@PostMapping("/{saegimid}/likes/{userid}")
	public ResponseEntity<Map<String, Object>> postLikesOfSaegimBySid(@PathVariable("saegimid") long saegimId, @PathVariable("userid") long userId) throws Exception{
		return handleSuccess(likesService.postLikesOfSaegimBySid(saegimId, userId));
	}
	@ApiOperation("saegimId와 userId로 좋아요 정보 삭제")
	@DeleteMapping("/{saegimid}/likes/{userid}")
	public ResponseEntity<Map<String, Object>> deleteLikesOfSaegimBySid(@PathVariable("saegimid") long saegimId, @PathVariable("userid") long userId) throws Exception{
		return handleSuccess(likesService.deleteLikesOfSaegimBySid(saegimId, userId));
	}
	// ===================== 새김 작성자 =====================
	@ApiOperation("userId으로 새김 List 검색")
	@GetMapping("/userid/{userid}")
	public ResponseEntity<Map<String, Object>> getSaegimsByUid(@PathVariable("userid") long userId) throws Exception{
		return handleSuccess(saegimService.getSaegimsByUserId(userId));
	}
}
