package com.ssafy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.entity.Likes;
import com.ssafy.entity.Saegim;
import com.ssafy.entity.User;
import com.ssafy.repositories.LikeRepository;
import com.ssafy.repositories.SaegimRepository;
import com.ssafy.repositories.UserRepository;

@Service
public class LikesServiceImpl implements LikesService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private SaegimRepository saegimRepository;
	@Autowired
	private LikeRepository likeRepository;
	@Override
	public List<Likes> getLikesByUid(long uId) {
		return likeRepository.findByuId(uId);
	}
	@Override
	public List<Likes> getLikesBySid(long sId) {
		return likeRepository.findBysId(sId);
	}
}
