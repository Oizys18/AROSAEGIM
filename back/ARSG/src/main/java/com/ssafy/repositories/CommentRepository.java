package com.ssafy.repositories;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
	Comment findById(Long id);
	Set<Comment> findByUserId(Long userId);
	Set<Comment> findBySaegimId(Long saegimId);
	List<Comment> findAll();
	
	@Transactional
	void removeById(Long commentId);
}