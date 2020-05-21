package com.ssafy.service;

import java.util.List;

import com.ssafy.dto.SaegimDto;
import com.ssafy.dto.SaegimFormDto;
import com.ssafy.entity.Saegim;

public interface SaegimService {
	public SaegimDto getSaegim(long sId);	// saegim_id로 새김 찾기
	public SaegimDto postSaegim(SaegimFormDto saegimFormDto);	// 새로운 새김 등록
	public List<SaegimDto> getSaegimsByUid(long uid);	// user_id로 사용자의 모든 새김 찾기 
	public List<SaegimDto> getSaegims();	// 모든 새김 찾기
	public Long getSaegimCount();	// 모든 새김 갯수
	
	public List<SaegimDto> getSaegimsByGeo(double lat, double lng, int meter);	// 위치로 새김 찾기
	public Long deleteSaegimBySid(long saegimid);
}
