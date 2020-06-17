package com.ssafy.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
	Comment findById(Long id);
	List<Comment> findByUserId(Long userId);
	List<Comment> findBySaegimId(Long saegimId);
	List<Comment> findAll();
	
	@Transactional
	void removeById(Long commentId);
}
