package com.ssafy.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.dto.SaegimDetailDto;
import com.ssafy.dto.SaegimDto;
import com.ssafy.dto.SaegimFormDto;
import com.ssafy.entity.Hashtag;
import com.ssafy.entity.Saegim;
import com.ssafy.entity.Tagging;
import com.ssafy.repositories.CommentRepository;
import com.ssafy.repositories.FileRepository;
import com.ssafy.repositories.HashtagRepository;
import com.ssafy.repositories.LikesRepository;
import com.ssafy.repositories.SaegimRepository;
import com.ssafy.repositories.TaggingRepository;
import com.ssafy.repositories.UserRepository;

@Service
public class SaegimServiceImpl implements SaegimService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private SaegimRepository saegimRepository;
	@Autowired
	private LikesRepository likesRepository;
	@Autowired
	private TaggingRepository taggingRepository;
	@Autowired
	private CommentRepository commentRepository;
	@Autowired
	private HashtagRepository hashtagRepository;
	@Autowired
	private FileRepository fileRepository;
	
	/*
	 * private static double distance(double lat1, double lon1, double lat2, double
	 * lon2) {
	 * 
	 * double theta = lon1 - lon2; double dist = Math.sin(deg2rad(lat1)) *
	 * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
	 * Math.cos(deg2rad(theta));
	 * 
	 * dist = Math.acos(dist); dist = rad2deg(dist); dist = dist * 60 * 1.1515;
	 * 
	 * dist = dist * 1609.344;
	 * 
	 * return (dist); } private static double deg2rad(double deg) { return (deg *
	 * Math.PI / 180.0); } private static double rad2deg(double rad) { return (rad *
	 * 180 / Math.PI); }
	 */
	

	@Override
	public SaegimDto getSaegimBySaegimId(Long saegimId) {
		Saegim saegim = saegimRepository.findById(saegimId);
		saegim.setTaggings(taggingRepository.findBySaegimId(saegimId));
		saegim.setFiles(fileRepository.findBySaegimId(saegimId));
		saegim.setUserName(userRepository.findById(saegim.getUserId()).getName());
		return SaegimDto.of(saegim);
	}
	@Override
	public SaegimDetailDto getDetailBySaegimId(Long saegimId) {
		Saegim saegim = saegimRepository.findById(saegimId);
		saegim.setUserName(userRepository.findById(saegim.getUserId()).getName());
		saegim.setLikes(likesRepository.findBySaegimId(saegimId));
		saegim.setTaggings(taggingRepository.findBySaegimId(saegimId));
		saegim.setComments(commentRepository.findBySaegimId(saegimId));
		saegim.setFiles(fileRepository.findBySaegimId(saegimId));
		return SaegimDetailDto.of(saegim);
//				.orElseThrow(() -> 
//        		new RestException(HttpStatus.NOT_FOUND, "Not found board"));
	}
	@Override
	public SaegimDto postSaegim(SaegimFormDto saegimFormDto) {
		Set<Hashtag> tags = new HashSet<Hashtag>();
		for (String tag : saegimFormDto.getTags()) {
			Hashtag ht = hashtagRepository.findByName(tag);
			if(ht == null) {
				ht = new Hashtag(tag);
				hashtagRepository.save(ht);
			}
			tags.add(ht);
		}
		Saegim saegim = Saegim.of(saegimFormDto);
		saegim = saegimRepository.save(saegim);
		long sId = saegim.getId();
		String pointwkt = String.format("POINT(%s %s)", saegimFormDto.getLatitude(), saegimFormDto.getLongitude());
		saegimRepository.savePointInSaegim(sId, pointwkt);
		List<Tagging> taggings = new ArrayList<Tagging>();
		for (Hashtag hashtag : tags) {
			Tagging tagging = new Tagging(hashtag.getId(), sId);
			taggingRepository.save(tagging);
			taggings.add(tagging);
		}
		return getSaegimBySaegimId(sId);
	}
	@Override
	public List<SaegimDto> getSaegimsByUserId(Long userId) {
		List<Saegim> saegimList = saegimRepository.findByUserId(userId);
		saegimList.forEach(saegim->saegim.setUserName(userRepository.findById(saegim.getUserId()).getName()));
		saegimList.forEach(saegim->saegim.setTaggings(taggingRepository.findBySaegimId(saegim.getId())));
		saegimList.forEach(saegim->saegim.setFiles(fileRepository.findBySaegimId(saegim.getId())));
		return saegimList.stream()
				.map(saegim->SaegimDto.of(saegim))
				.collect(Collectors.toList());
	}
	@Override
	public List<SaegimDto> getSaegims() {
		List<Saegim> saegimList = saegimRepository.findAll();
		for (Saegim saegim : saegimList) {
			String pointwkt = String.format("POINT(%s %s)", saegim.getLatitude(), saegim.getLongitude());
			saegimRepository.savePointInSaegim(saegim.getId(), pointwkt);
		}
		saegimList.forEach(saegim->saegim.setUserName(userRepository.findById(saegim.getUserId()).getName()));
		saegimList.forEach(saegim->saegim.setTaggings(taggingRepository.findBySaegimId(saegim.getId())));
		saegimList.forEach(saegim->saegim.setFiles(fileRepository.findBySaegimId(saegim.getId())));
		return saegimList.stream()
				.map(saegim->SaegimDto.of(saegim))
				.collect(Collectors.toList());
	}
	@Override
	public Long getSaegimCount() {
		return saegimRepository.count();
	}

	@Override
	public List<SaegimDto> getSaegimsByGeo(Double lat, Double lng, Double meter) {
//		List<Saegim> saegimList = new ArrayList<Saegim>();
		
		double lat1 = lat - ( meter / 1000 / 111);
		double lat2 = lat + ( meter / 1000 / 111);
		double lng1 = lng - ( meter / 1000 / 88);
		double lng2 = lng + ( meter / 1000 / 88);
		List<Saegim> saegimList = new ArrayList<Saegim>();
		
		List<Long> idList = saegimRepository.findSomething(String.format("%.6f", lat1), String.format("%.6f", lng1), String.format("%.6f", lat2), String.format("%.6f", lng2));
		for (Long id : idList) saegimList.add(saegimRepository.findById(id));
		saegimList.forEach(saegim->saegim.setUserName(userRepository.findById(saegim.getUserId()).getName()));
		saegimList.forEach(saegim->saegim.setTaggings(taggingRepository.findBySaegimId(saegim.getId())));
		saegimList.forEach(saegim->saegim.setFiles(fileRepository.findBySaegimId(saegim.getId())));
		return saegimList.stream()
				.map(saegim->SaegimDto.of(saegim))
				.collect(Collectors.toList());
	}
	@Override
	public List<SaegimDto> getSaegimsByGeoAndTime(Double lat, Double lng, Double meter, Long userId, Long s, Long e) {
		double lat1 = lat - ( meter / 1000 / 111);
		double lat2 = lat + ( meter / 1000 / 111);
		double lng1 = lng - ( meter / 1000 / 88);
		double lng2 = lng + ( meter / 1000 / 88);
		List<Long> idList = saegimRepository.findSomething(String.format("%.6f", lat1), String.format("%.6f", lng1), String.format("%.6f", lat2), String.format("%.6f", lng2));
		
		Date start = null;
		Date end = null;
		if(s > 0) start = new Date(s);
		if(e > 0) end = new Date(e);
		
		List<Saegim> saegimList = new ArrayList<Saegim>();
		for (Long id : idList) {
			Saegim saegim = saegimRepository.findById(id);
			if(userId > 0 && !saegim.getUserId().equals(userId)) continue;
			if((start != null && end != null) && (saegim.getRegDate().before(start) || saegim.getRegDate().after(end))) continue;
			saegimList.add(saegim);
		}
		saegimList.forEach(saegim->saegim.setUserName(userRepository.findById(saegim.getUserId()).getName()));
		saegimList.forEach(saegim->saegim.setTaggings(taggingRepository.findBySaegimId(saegim.getId())));
		saegimList.forEach(saegim->saegim.setFiles(fileRepository.findBySaegimId(saegim.getId())));
		return saegimList.stream()
				.map(saegim->SaegimDto.of(saegim))
				.collect(Collectors.toList());
	}
	@Override
	public Long deleteSaegimBySid(Long saegimid) {
		return saegimRepository.removeById(saegimid);
	}
	@Override
	public SaegimDto putSaegim(Long saegimId, SaegimFormDto saegimFormDto) {
		taggingRepository.removeBysaegimId(saegimId);
		Set<Hashtag> tags = new HashSet<Hashtag>();
		for (String tag : saegimFormDto.getTags()) {
			Hashtag ht = hashtagRepository.findByName(tag);
			if(ht == null) {
				ht = new Hashtag(tag);
				ht.setId(null);
				hashtagRepository.save(ht);
			}
			tags.add(ht);
		}
		Saegim saegim = Saegim.of(saegimFormDto);
		saegim.setId(saegimId);
		saegim = saegimRepository.save(saegim);
		List<Tagging> taggings = new ArrayList<Tagging>();
		for (Hashtag hashtag : tags) {
			Tagging tagging = new Tagging(hashtag.getId(), saegim.getId());
			taggingRepository.save(tagging);
			taggings.add(tagging);
		}
		if(saegim != null) {
			return getSaegimBySaegimId(saegim.getId());
		} else {
			return null;
		}
	}
}
