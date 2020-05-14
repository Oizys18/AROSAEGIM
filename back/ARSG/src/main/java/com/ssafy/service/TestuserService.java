package com.ssafy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.domain.Testuser;
import com.ssafy.repositories.TestuserRepository;

@Service
public class TestuserService {
	@Autowired
	private TestuserRepository testuserRepository;
	
	public Testuser getUser(String name) {
		return testuserRepository.findByName(name);
//				.orElseThrow(() -> 
//        		new RestException(HttpStatus.NOT_FOUND, "Not found board"));
	}
	
	public List<Testuser> getUsers() {
		return testuserRepository.findAll();
	}
	
	public Long getUserCount() {
		return testuserRepository.count();
	}
}
