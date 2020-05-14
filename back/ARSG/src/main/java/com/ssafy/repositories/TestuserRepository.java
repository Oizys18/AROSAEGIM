package com.ssafy.repositories;

import org.springframework.data.repository.CrudRepository;
import com.ssafy.domain.Testuser;

public interface TestuserRepository extends CrudRepository<Testuser, Integer> {
	Testuser findByName(String name);
}
