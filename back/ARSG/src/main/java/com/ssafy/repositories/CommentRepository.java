package com.ssafy.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
	Comment findByid(Long id);
	Comment findBysId(Long sId);
	List<Comment> findAll();
}
