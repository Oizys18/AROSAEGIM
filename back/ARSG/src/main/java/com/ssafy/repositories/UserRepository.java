package com.ssafy.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	User findById(Long id);
	User findByEmail(String email);
	User findByName(String name);
	List<User> findAll();
	long count();
	
	@Transactional
	long removeById(Long userid);
}
