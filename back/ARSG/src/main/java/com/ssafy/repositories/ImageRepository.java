package com.ssafy.repositories;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.entity.Comment;
import com.ssafy.entity.Image;

public interface ImageRepository extends JpaRepository<Image, Integer> {
	Image findById(Long id);
	Set<Image> findBySaegimId(Long saegimId);
	List<Image> findAll();
	
	@Transactional
	void removeById(Long commentId);
}
