package com.ssafy.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.entity.Tagging;

public interface TaggingRepository extends JpaRepository<Tagging, Integer> {
	List<Tagging> findByTagId(Long tId);
	List<Tagging> findBySaegimId(Long sId);
	List<Tagging> findAll();
	
	@Transactional
	void removeBysaegimId(Long sId);
}
