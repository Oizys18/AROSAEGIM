package com.ssafy.repositories;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.entity.Likes;

public interface LikesRepository extends JpaRepository<Likes, Integer> {
	Set<Likes> findByUserId(Long uId);
	Set<Likes> findBySaegimId(Long sId);
	List<Likes> findAll();
	
	@Transactional
	void removeByUserIdAndSaegimId(Long UserId, Long SaegimId);
}
