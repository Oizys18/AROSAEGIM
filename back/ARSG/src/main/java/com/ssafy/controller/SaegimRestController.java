package com.ssafy.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.entity.Saegim;
import com.ssafy.service.SaegimServiceImpl;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@RequestMapping("/saegim")
public class SaegimRestController extends EntityRestController{
	@Autowired
	private SaegimServiceImpl saegimService;
	
	@ApiOperation("saegimId으로 새김 정보 검색")
	@GetMapping("/id/{id}")
	public ResponseEntity<Map<String, Object>> getSaegim(@PathVariable("id") long saegimid) throws Exception{
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
	public ResponseEntity<Map<String, Object>> postSaegim(Saegim saegim) throws Exception{
		return handleSuccess(saegimService.postSaegim(saegim));
	}
}
