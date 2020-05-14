package com.ssafy.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.domain.Testuser;

public interface TestuserRepository extends JpaRepository<Testuser, Integer> {
	Testuser findById(long id);
	Testuser findByName(String name);
	List<Testuser> findAll();
	long count();
}
