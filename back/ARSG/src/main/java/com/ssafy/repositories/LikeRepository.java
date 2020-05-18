package com.ssafy.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.entity.Likes;

public interface LikeRepository extends JpaRepository<Likes, Integer> {
	List<Likes> findByuId(Long uId);
	List<Likes> findBysId(Long sId);
}
