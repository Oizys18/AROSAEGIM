package com.ssafy.service;

import java.util.List;

import com.ssafy.dto.CommentDto;
import com.ssafy.dto.CommentFormDto;

public interface CommentService {
	public List<CommentDto> getComments();
	public List<CommentDto> getCommentsByUserId(Long userId);
	public List<CommentDto> getCommentsBySaegimId(Long saegimId);
	public List<CommentDto> postCommentOfSaegimBySid(Long saegimId, CommentFormDto commentFormDto);
	public List<CommentDto> deleteCommentOfSaegimBySidnCId(Long saegimId, Long commentId);
	public List<CommentDto> putCommentOfSaegimBySidnCId(Long saegimId, Long commentId, CommentFormDto commentFormDto);
}
