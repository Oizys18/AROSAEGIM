package com.ssafy.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.service.FileService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@RequestMapping("/files")
public class FileRestController extends EntityRestController{
	@Autowired
	private FileService fileService;
	
	@ApiOperation("모든 첨부 파일 리스트 검색")
	@GetMapping()
	public ResponseEntity<Map<String, Object>> getFiles() throws Exception{
		return handleSuccess(fileService.getFiles());
	}
	@ApiOperation("saegimId 로 첨부 파일 리스트 검색")
	@GetMapping("/saegimid/{saegimid}")
	public ResponseEntity<Map<String, Object>> getFilesBySaegimId(@PathVariable("saegimid") long saegimId) throws Exception{
		return handleSuccess(fileService.getFilesBySaegimId(saegimId));
	}
	@ApiOperation("fileId 로 첨부 파일 정보 검색")
	@GetMapping("/fileid/{fileid}")
	public ResponseEntity<Map<String, Object>> getFileByFileId(@PathVariable("fileid") long fileId) throws Exception{
		return handleSuccess(fileService.getFileByFileId(fileId));
	}
	@ApiOperation("saegimId 로 하나의 새로운 첨부 파일 등록")
	@RequestMapping(value = "/saegimid/{saegimid}",
				    consumes = { "multipart/form-data", "application/x-www-form-urlencoded" },
				    method = RequestMethod.POST)
	public ResponseEntity<Map<String, Object>> uploadFile(@PathVariable("saegimid") long saegimId, @RequestPart MultipartFile file) throws Exception{
		System.out.println("files name: " + file.getOriginalFilename());
		return handleSuccess(fileService.postFile(saegimId, file));
	}
	@ApiOperation("saegimId 로 첨부 파일 정보 삭제")
	@DeleteMapping("/saegimid/{saegimid}")
	public ResponseEntity<Map<String, Object>> deleteFileBySaegimId(@PathVariable("saegimid") long saegimId) throws Exception{
		return handleSuccess(fileService.deleteFileBySaegimId(saegimId));
	}
	@ApiOperation("fileId 로 첨부 파일 정보 삭제")
	@DeleteMapping("/fileid/{fileid}")
	public ResponseEntity<Map<String, Object>> deleteFile(@PathVariable("fileid") long fileId) throws Exception{
		return handleSuccess(fileService.deleteFileByFileId(fileId));
	}
}
