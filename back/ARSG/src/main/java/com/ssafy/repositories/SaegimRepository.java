package com.ssafy.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.entity.Saegim;

public interface SaegimRepository extends JpaRepository<Saegim, Integer> {
	Saegim findByid(Long id);
	List<Saegim> findByuId(Long uId);
	List<Saegim> findAll();
	long count();
}
