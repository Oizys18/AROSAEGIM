package com.ssafy.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	User findById(Long id);
	User findByName(String name);
	List<User> findAll();
	long count();
}
