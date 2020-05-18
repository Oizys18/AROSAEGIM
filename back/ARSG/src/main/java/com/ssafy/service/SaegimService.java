package com.ssafy.service;

import java.util.List;

import com.ssafy.entity.Saegim;

public interface SaegimService {
	public Saegim getSaegim(long sId);	// saegim_id로 새김 찾기
	public Saegim postSaegim(Saegim saegim);	// 새로운 새김 등록
	public List<Saegim> getSaegimsByUid(long uid);	// user_id로 사용자의 모든 새김 찾기 
	public List<Saegim> getSaegims();	// 모든 새김 찾기
	public Long getSaegimCount();	// 모든 새김 갯수
}
