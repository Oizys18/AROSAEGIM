package com.ssafy.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.entity.Hashtag;

public interface HashtagRepository extends JpaRepository<Hashtag, Integer> {
	Hashtag findById(Long tId);
	Hashtag findByName(String tName);
	List<Hashtag> findAll();
}
