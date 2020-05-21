package com.ssafy.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.dto.SaegimFormDto;
import com.ssafy.entity.Saegim;
import com.ssafy.service.SaegimService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@RequestMapping("/saegim")
public class SaegimRestController extends EntityRestController{
	@Autowired
	private SaegimService saegimService;
	
	@ApiOperation("saegimId으로 새김 정보 검색")
	@GetMapping("/id/{id}")
	public ResponseEntity<Map<String, Object>> getSaegimBySid(@PathVariable("id") long saegimid) throws Exception{
		return handleSuccess(saegimService.getSaegim(saegimid));
	}
	@ApiOperation("userId으로 새김 List 검색")
	@GetMapping("/uid/{uid}")
	public ResponseEntity<Map<String, Object>> getSaegimsByUid(@PathVariable("uid") long userid) throws Exception{
		return handleSuccess(saegimService.getSaegimsByUid(userid));
	}
	@ApiOperation("모든 새김 정보 List")
	@GetMapping("/all")
	public ResponseEntity<Map<String, Object>> getSaegims() throws Exception{
		return handleSuccess(saegimService.getSaegims());
	}
	@ApiOperation("모든 새김의 수")
	@GetMapping("/count")
	public ResponseEntity<Map<String, Object>> getSaegimsCount() throws Exception{
		return handleSuccess(saegimService.getSaegimCount());
	}
	@ApiOperation("새로운 새김 등록")
	@PostMapping("/")
	public ResponseEntity<Map<String, Object>> postSaegim(SaegimFormDto saegimFormDto) throws Exception{
		return handleSuccess(saegimService.postSaegim(saegimFormDto));
	}
	// 추가
	@ApiOperation("lat, lng으로 주변 새김 List 검색")
	@GetMapping("/latlng")
	public ResponseEntity<Map<String, Object>> getSaegimsByGeo(@RequestParam double lat, @RequestParam double lng, @RequestParam int meter) throws Exception{
		return handleSuccess(saegimService.getSaegimsByGeo(lat, lng, meter));
	}
	@ApiOperation("saegimId으로 새김 정보 삭제")
	@DeleteMapping("/id/{id}")
	public ResponseEntity<Map<String, Object>> deleteSaegimBySid(@PathVariable("id") long saegimid) throws Exception{
		return handleSuccess((saegimService.deleteSaegimBySid(saegimid)>0)?"Remove Success":"Remove Fail");
	}
}
