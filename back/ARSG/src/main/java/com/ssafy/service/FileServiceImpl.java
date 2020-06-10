package com.ssafy.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.dto.FileDto;
import com.ssafy.entity.Files;
import com.ssafy.entity.Image;
import com.ssafy.repositories.FileRepository;
import com.ssafy.repositories.ImageRepository;
import com.ssafy.util.Base64ToImgDecoder;

@Service
public class FileServiceImpl implements FileService {
	@Autowired
	FileRepository fileRepository; 
	@Autowired
	ImageRepository imageRepository; 
	
	@Value("${custom.path.upload}") 
	String dir;
	
	@Override
	public List<FileDto> getFiles() {
		return fileRepository.findAll().stream()
				.map(file->FileDto.of(file))
				.collect(Collectors.toList());
	}

	@Override
	public List<FileDto> getFilesBySaegimId(Long saegimId) {
		return fileRepository.findBySaegimId(saegimId).stream()
				.map(file->FileDto.of(file))
				.collect(Collectors.toList());
	}

	@Override
	public FileDto getFileByFileId(Long fileId) {
		return FileDto.of(fileRepository.findById(fileId));
	}

	@Override
	public FileDto postFile(Long saegimId, MultipartFile mpFile) throws Exception{
		String originalfileName = mpFile.getOriginalFilename();
		String extension = FilenameUtils.getExtension(originalfileName);
		Files file = new Files(saegimId, extension);
		file = fileRepository.save(file);
		Long fileId = file.getId();
		File dest = new File(dir + fileId + '.' + extension);
		try {
			mpFile.transferTo(dest);
		} catch (Exception e) {
			throw e;
		}
		return FileDto.of(file);
	}
	@Override
	public List<FileDto> postFiles(Long saegimId, List<MultipartFile> files) throws Exception {
		List<FileDto> fileDtoList = new ArrayList<>();
		for (MultipartFile mpFile : files) {
			fileDtoList.add(postFile(saegimId, mpFile));
		}
		return fileDtoList;
	}

	@Override
	public Long deleteFileByFileId(Long fileId) {
		Files files = fileRepository.findById(fileId);
		File dest = new File(dir + files.getId() + '.' + files.getExtension());
		if(dest.delete())
			return fileRepository.removeById(fileId);
		else
			return (long) 0;
	}

	@Override
	public Long deleteFileBySaegimId(Long saegimId) {
		List<Files> list = fileRepository.findBySaegimId(saegimId);
		for (Files files : list) {
			File dest = new File(dir + files.getId() + '.' + files.getExtension());
			dest.delete();
		}
		fileRepository.removeBysaegimId(saegimId);
		return saegimId;
	}

	@Override
	public boolean baseToImg() {
//		Image img = imageRepository.findById((long) 2223);
		List<Image> imgList = imageRepository.findAll();
		for (Image img : imgList) {
			String base = img.getSource();
			Files file = new Files(img.getSaegimId(), "jpg");
			file = fileRepository.save(file);
			Long fileId = file.getId();
			
			Base64ToImgDecoder.decoder(base, dir + fileId + '.' + "jpg");
		}
		return true;
	}
	
}
