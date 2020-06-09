package com.ssafy.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.entity.Saegim;

public interface SaegimRepository extends JpaRepository<Saegim, Integer> {
	Saegim findById(Long id);
	List<Saegim> findByUserId(Long userId);
	List<Saegim> findAll();
	long count();
	
	@Transactional
	Long removeById(Long id);
}
