package com.ssafy.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.entity.Files;

public interface FileRepository extends JpaRepository<Files, Integer> {
	Files findById(Long fileId);
	List<Files> findBySaegimId(Long saegimId);
	List<Files> findAll();
	
	@Transactional
	Long removeById(Long fileId);
	@Transactional
	void removeBysaegimId(Long saegimId);
}
