package com.ssafy.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.entity.Favorite;
import com.ssafy.entity.Likes;

public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
	List<Favorite> findByuserId(Long uId);
	List<Favorite> findBysaegimId(Long sId);
	List<Favorite> findAll();
}
