package com.ssafy.service;

import java.util.List;

import com.ssafy.entity.Likes;

public interface LikesService {
	public List<Likes> getLikesByUid(long uId);	// user_id 로 likes 목록 찾기
	public List<Likes> getLikesBySid(long sId); // saegim_id 로 likes 목록 찾기
	
}
