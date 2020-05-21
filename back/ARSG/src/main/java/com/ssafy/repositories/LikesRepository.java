package com.ssafy.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.entity.Likes;

public interface LikesRepository extends JpaRepository<Likes, Integer> {
	List<Likes> findByuserId(Long uId);
	List<Likes> findBysaegimId(Long sId);
	List<Likes> findAll();
}
