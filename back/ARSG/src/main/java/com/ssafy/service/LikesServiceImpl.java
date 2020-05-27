package com.ssafy.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.dto.LikesDto;
import com.ssafy.entity.Likes;
import com.ssafy.repositories.LikesRepository;

@Service
public class LikesServiceImpl implements LikesService {
	@Autowired
	private LikesRepository likesRepository;
	
	@Override
	public List<LikesDto> getLikesByUserId(Long userId) {
		return likesRepository.findByUserId(userId).stream()
				.map(likes->LikesDto.of(likes))
				.collect(Collectors.toList());
	}
	@Override
	public List<LikesDto> getLikesBySaegimId(Long saegimId) {
		return likesRepository.findBySaegimId(saegimId).stream()
				.map(likes->LikesDto.of(likes))
				.collect(Collectors.toList());
	}
	@Override
	public List<LikesDto> getLikes() {
		return likesRepository.findAll().stream()
				.map(likes->LikesDto.of(likes))
				.collect(Collectors.toList());
	}
	@Override
	public List<LikesDto> postLikesOfSaegimBySid(Long saegimId, Long userId) {
		Likes likes = new Likes(saegimId, userId);
		likesRepository.save(likes);
		return getLikesBySaegimId(saegimId);
	}
	@Override
	public List<LikesDto> deleteLikesOfSaegimBySid(Long saegimId, Long userId) {
		likesRepository.removeByUserIdAndSaegimId(userId, saegimId);
		return getLikesBySaegimId(saegimId);
	}
}
