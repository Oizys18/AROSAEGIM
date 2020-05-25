package com.ssafy.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.dto.*;
import com.ssafy.entity.*;
import com.ssafy.repositories.*;

@Service
public class SaegimServiceImpl implements SaegimService {
	@Autowired
	private SaegimRepository saegimRepository;
	@Autowired
	private HashtagRepository hashtagRepository;
	@Autowired
	private CommentRepository commentRepository;
	
	private static double distance(double lat1, double lon1, double lat2, double lon2) {
		
		double theta = lon1 - lon2;
		double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
		
		dist = Math.acos(dist);
		dist = rad2deg(dist);
		dist = dist * 60 * 1.1515;
		
		dist = dist * 1609.344;
		
		return (dist);
	}
	private static double deg2rad(double deg) {
		return (deg * Math.PI / 180.0);
	}
	private static double rad2deg(double rad) {
		return (rad * 180 / Math.PI);
	}
	
	@Override
	public SaegimDto getSaegim(long sId) {
		Saegim saegim = saegimRepository.findById(sId);
		SaegimDto saegimDto = new SaegimDto(saegim.getId(), saegim.getUId(), saegim.getUName(), saegim.getRegDate(), saegim.getContents(), saegim.getLatitude(), saegim.getLongitude(), saegim.getW3w());
		List<LikesDto> likes = saegimDto.getLikes();
		for (Likes l : saegim.getLikes()) {
			likes.add(new LikesDto(l.getSaegim_id(), l.getUser_id(), l.getUser().getName(), l.getSaegim().getUName()));
		}
		List<HashtagDto> tags = saegimDto.getTags();
		List<CommentDto> comments = saegimDto.getComments();
		//더미 데이터
		for (Hashtag hashtag : hashtagRepository.findAll()) {
			tags.add(new HashtagDto(hashtag.getId(), hashtag.getName()));
		}
		for (Comment comment : commentRepository.findAll()) {
			comments.add(new CommentDto(comment.getId(), saegim.getId(), comment.getUId(),comment.getUser_name(), comment.getRegDate(), comment.getContents()));
		}
		//여기까지
		return saegimDto;
//				.orElseThrow(() -> 
//        		new RestException(HttpStatus.NOT_FOUND, "Not found board"));
	}
	@Override
	public SaegimDto postSaegim(SaegimFormDto saegimFormDto) {
		Saegim tmp = new Saegim();
		tmp.setId(Long.parseLong("0"));
		tmp.setUId(saegimFormDto.getUId());
		tmp.setUName(saegimFormDto.getUName());
		tmp.setRegDate(java.sql.Date.valueOf(saegimFormDto.getRegDate()));
		tmp.setContents(saegimFormDto.getContents());
		tmp.setLatitude(saegimFormDto.getLatitude());
		tmp.setLongitude(saegimFormDto.getLongitude());
		tmp.setW3w(saegimFormDto.getW3w());
		tmp.setSecret(saegimFormDto.getSecret());
		tmp = saegimRepository.save(tmp);
		if(tmp != null) {
			SaegimDto saegimDto = new SaegimDto(tmp.getId(), tmp.getUId(), tmp.getUName(), tmp.getRegDate(), tmp.getContents(), tmp.getLatitude(), tmp.getLongitude(), tmp.getW3w());
			return saegimDto;
		} else {
			return null;
		}
	}
	@Override
	public List<SaegimDto> getSaegimsByUid(long uid) {
		List<Saegim> list = saegimRepository.findByuId(uid);
		List<SaegimDto> saegimDtoList = new ArrayList<SaegimDto>();
		for (Saegim saegim : list) {
			SaegimDto saegimDto = new SaegimDto(saegim.getId(), saegim.getUId(), saegim.getUName(), saegim.getRegDate(), saegim.getContents(), saegim.getLatitude(), saegim.getLongitude(), saegim.getW3w());
			List<LikesDto> likes = saegimDto.getLikes();
			for (Likes l : saegim.getLikes()) {
				likes.add(new LikesDto(l.getSaegim_id(), l.getUser_id(), l.getUser().getName(), l.getSaegim().getUName()));
			}
			List<HashtagDto> tags = saegimDto.getTags();
			List<CommentDto> comments = saegimDto.getComments();
			//더미 데이터
			for (Hashtag hashtag : hashtagRepository.findAll()) {
				tags.add(new HashtagDto(hashtag.getId(), hashtag.getName()));
			}
			for (Comment comment : commentRepository.findAll()) {
				comments.add(new CommentDto(comment.getId(), saegim.getId(), comment.getUId(),comment.getUser_name(), comment.getRegDate(), comment.getContents()));
			}
			//여기까지
			saegimDtoList.add(saegimDto);
		}
		return saegimDtoList;
	}
	@Override
	public List<SaegimDto> getSaegims() {
		List<Saegim> list = saegimRepository.findAll();
		List<SaegimDto> saegimDtoList = new ArrayList<SaegimDto>();
		for (Saegim saegim : list) {
			SaegimDto saegimDto = new SaegimDto(saegim.getId(), saegim.getUId(), saegim.getUName(), saegim.getRegDate(), saegim.getContents(), saegim.getLatitude(), saegim.getLongitude(), saegim.getW3w());
			List<LikesDto> likes = saegimDto.getLikes();
			for (Likes l : saegim.getLikes()) {
				likes.add(new LikesDto(l.getSaegim_id(), l.getUser_id(), l.getUser().getName(), l.getSaegim().getUName()));
			}
			List<HashtagDto> tags = saegimDto.getTags();
			List<CommentDto> comments = saegimDto.getComments();
			//더미 데이터
			for (Hashtag hashtag : hashtagRepository.findAll()) {
				tags.add(new HashtagDto(hashtag.getId(), hashtag.getName()));
			}
			for (Comment comment : commentRepository.findAll()) {
				comments.add(new CommentDto(comment.getId(), saegim.getId(), comment.getUId(),comment.getUser_name(), comment.getRegDate(), comment.getContents()));
			}
			//여기까지
			saegimDtoList.add(saegimDto);
		}
		return saegimDtoList;
	}
	@Override
	public Long getSaegimCount() {
		return saegimRepository.count();
	}
	// 추가
	@Override
	public List<SaegimDto> getSaegimsByGeo(double lat, double lng, int meter) {
		List<Saegim> list = new ArrayList<Saegim>();
		for (Saegim saegim : saegimRepository.findAll()) {
			if(distance(saegim.getLatitude(), saegim.getLongitude(), lat, lng) <= meter)
				list.add(saegim);
		}
		List<SaegimDto> saegimDtoList = new ArrayList<SaegimDto>();
		for (Saegim saegim : list) {
			SaegimDto saegimDto = new SaegimDto(saegim.getId(), saegim.getUId(), saegim.getUName(), saegim.getRegDate(), saegim.getContents(), saegim.getLatitude(), saegim.getLongitude(), saegim.getW3w());
			List<LikesDto> likes = saegimDto.getLikes();
			for (Likes l : saegim.getLikes()) {
				likes.add(new LikesDto(l.getSaegim_id(), l.getUser_id(), l.getUser().getName(), l.getSaegim().getUName()));
			}
			List<HashtagDto> tags = saegimDto.getTags();
			List<CommentDto> comments = saegimDto.getComments();
			//더미 데이터
			for (Hashtag hashtag : hashtagRepository.findAll()) {
				tags.add(new HashtagDto(hashtag.getId(), hashtag.getName()));
			}
			for (Comment comment : commentRepository.findAll()) {
				comments.add(new CommentDto(comment.getId(), saegim.getId(), comment.getUId(),comment.getUser_name(), comment.getRegDate(), comment.getContents()));
			}
			//여기까지
			saegimDtoList.add(saegimDto);
		}
		return saegimDtoList;
	}
	@Override
	public Long deleteSaegimBySid(long saegimid) {
		return saegimRepository.removeById(saegimid);
	}
}
