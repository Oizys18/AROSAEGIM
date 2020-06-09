package com.ssafy.service;

import java.util.List;

import com.ssafy.dto.LikesDto;

public interface LikesService {
	public List<LikesDto> getLikesByUserId(Long userId);
	public List<LikesDto> getLikesBySaegimId(Long saegimId);
	public List<LikesDto> getLikes();
	public List<LikesDto> postLikesOfSaegimBySid(Long saegimId, Long userId);
	public List<LikesDto> deleteLikesOfSaegimBySid(Long saegimId, Long userId);
}
