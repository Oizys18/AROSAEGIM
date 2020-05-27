package com.ssafy.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.dto.CommentDto;
import com.ssafy.dto.CommentFormDto;
import com.ssafy.dto.LikesDto;
import com.ssafy.entity.Comment;
import com.ssafy.repositories.CommentRepository;
import com.ssafy.repositories.LikesRepository;

@Service
public class CommentServiceImpl implements CommentService {
	@Autowired
	private CommentRepository commentRepository;

	@Override
	public List<CommentDto> getCommentsByUserId(Long userId) {
		return commentRepository.findByUserId(userId).stream()
				.map(comment->CommentDto.of(comment))
				.collect(Collectors.toList());
	}
	@Override
	public List<CommentDto> getCommentsBySaegimId(Long saegimId) {
		return commentRepository.findBySaegimId(saegimId).stream()
				.map(comment->CommentDto.of(comment))
				.collect(Collectors.toList());
	}
	@Override
	public List<CommentDto> getComments() {
		return commentRepository.findAll().stream()
				.map(comment->CommentDto.of(comment))
				.collect(Collectors.toList());
	}
	@Override
	public List<CommentDto> postCommentOfSaegimBySid(Long saegimId, CommentFormDto commentFormDto) {
		commentFormDto.setSaegimId(saegimId);
		Comment comment = Comment.of(commentFormDto);
		commentRepository.save(comment);
		return getCommentsBySaegimId(saegimId);
	}
	@Override
	public List<CommentDto> deleteCommentOfSaegimBySidnCId(Long saegimId, Long commentId) {
		if(commentRepository.findById(commentId).getSaegimId().equals(saegimId)) {
			commentRepository.removeById(commentId);
			return getCommentsBySaegimId(saegimId);
		} else
			return null;
	}
	@Override
	public List<CommentDto> putCommentOfSaegimBySidnCId(Long saegimId, Long commentId, CommentFormDto commentFormDto) {
		commentFormDto.setSaegimId(saegimId);
		Comment comment = Comment.of(commentFormDto);
		comment.setId(commentId);
		commentRepository.save(comment);
		return getCommentsBySaegimId(saegimId);
	}
}
