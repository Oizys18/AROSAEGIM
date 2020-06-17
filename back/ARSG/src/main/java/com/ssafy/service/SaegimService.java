package com.ssafy.service;

import java.util.List;

import com.ssafy.dto.SaegimDetailDto;
import com.ssafy.dto.SaegimDto;
import com.ssafy.dto.SaegimFormDto;

public interface SaegimService {
	public SaegimDto getSaegimBySaegimId(Long saegimId);	// saegim_id로 새김 찾기
	public SaegimDto postSaegim(SaegimFormDto saegimFormDto);	// 새로운 새김 등록
	public List<SaegimDto> getSaegimsByUserId(Long userId);	// user_id로 사용자의 모든 새김 찾기 
	public List<SaegimDto> getSaegims();	// 모든 새김 찾기
	public Long getSaegimCount();	// 모든 새김 갯수
	
	public List<SaegimDto> getSaegimsByGeo(Double lat, Double lng, Double meter);	// 위치로 새김 찾기
	public List<SaegimDto> getSaegimsByGeoAndTime(Double lat, Double lng, Double meter, Long userid, Long starttime, Long endtime);
	public Long deleteSaegimBySid(Long saegimid);
	public SaegimDetailDto getDetailBySaegimId(Long saegimId);
	public SaegimDto putSaegim(Long saegimId, SaegimFormDto saegimFormDto);
}
