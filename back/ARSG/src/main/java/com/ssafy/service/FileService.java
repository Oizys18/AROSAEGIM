package com.ssafy.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.dto.FileDto;

public interface FileService {
	public List<FileDto> getFiles();	// 모든 새김 찾기
	public List<FileDto> getFilesBySaegimId(Long saegimId);	// saegim_id로 새김 찾기
	public FileDto getFileByFileId(Long fileId);	// saegim_id로 새김 찾기
	public FileDto postFile(Long saegimId, MultipartFile file) throws Exception;	// 새로운 새김 등록
	public List<FileDto> postFiles(Long saegimId, List<MultipartFile> files) throws Exception;	// 새로운 새김 등록
	public Long deleteFileBySaegimId(Long saegimId);
	public Long deleteFileByFileId(Long fileId);
	public boolean baseToImg();
}
