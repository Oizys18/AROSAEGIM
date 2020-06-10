package com.ssafy.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.dto.CommentDto;
import com.ssafy.dto.CommentFormDto;
import com.ssafy.entity.Comment;
import com.ssafy.repositories.CommentRepository;
import com.ssafy.repositories.UserRepository;

@Service
public class CommentServiceImpl implements CommentService {
	@Autowired
	private CommentRepository commentRepository;
	@Autowired
	private UserRepository userRepository;

	@Override
	public List<CommentDto> getCommentsByUserId(Long userId) {
		List<Comment> commentList = commentRepository.findByUserId(userId);
		commentList.forEach(comment->comment.setUserName(userRepository.findById(comment.getUserId()).getName()));
		return commentList.stream()
				.map(comment->CommentDto.of(comment))
				.collect(Collectors.toList());
	}
	@Override
	public List<CommentDto> getCommentsBySaegimId(Long saegimId) {
		List<Comment> commentList = commentRepository.findBySaegimId(saegimId);
		commentList.forEach(comment->comment.setUserName(userRepository.findById(comment.getUserId()).getName()));
		return commentList.stream()
				.map(comment->CommentDto.of(comment))
				.collect(Collectors.toList());
	}
	@Override
	public List<CommentDto> getComments() {
		List<Comment> commentList = commentRepository.findAll();
		commentList.forEach(comment->comment.setUserName(userRepository.findById(comment.getUserId()).getName()));
		return commentList.stream()
				.map(comment->CommentDto.of(comment))
				.collect(Collectors.toList());
	}
	@Override
	public List<CommentDto> postCommentOfSaegimBySid(Long saegimId, CommentFormDto commentFormDto) {
		Comment comment = Comment.of(commentFormDto);
		comment.setSaegimId(saegimId);
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
		Comment comment = Comment.of(commentFormDto);
		comment.setSaegimId(saegimId);
		comment.setId(commentId);
		commentRepository.save(comment);
		return getCommentsBySaegimId(saegimId);
	}
}
