package com.ssafy.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
	private LikesRepository likesRepository;
	@Autowired
	private TaggingRepository taggingRepository;
	@Autowired
	private CommentRepository commentRepository;
	@Autowired
	private HashtagRepository hashtagRepository;
	@Autowired
	private ImageRepository imageRepository;
	
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
	public SaegimDto getSaegimBySaegimId(long saegimId) {
		Saegim saegim = saegimRepository.findById(saegimId);
		saegim.setTaggings(taggingRepository.findBySaegimId(saegimId));
		saegim.setImages(imageRepository.findBySaegimId(saegimId));
		return SaegimDto.of(saegim);
	}
	@Override
	public SaegimDetailDto getDetailBySaegimId(long saegimId) {
		Saegim saegim = saegimRepository.findById(saegimId);
		saegim.setLikes(
				likesRepository.findBySaegimId(
						saegimId));
		saegim.setTaggings(
				taggingRepository.findBySaegimId(
						saegimId));
		saegim.setComments(
				commentRepository.findBySaegimId(
						saegimId));
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
		System.out.println("============= saegim ID =============");
		System.out.println("sId : " + sId);
		System.out.println("============= saegim ID =============");
		List<Tagging> taggings = new ArrayList<Tagging>();
		for (Hashtag hashtag : tags) {
			Tagging tagging = new Tagging(hashtag.getId(), sId);
			taggingRepository.save(tagging);
			taggings.add(tagging);
		}
		for (String img : saegimFormDto.getImages()) {
			imageRepository.save(new Image(sId, img));
		}
		return getSaegimBySaegimId(saegim.getId());
	}
	@Override
	public List<SaegimDto> getSaegimsByUserId(long userId) {
		List<Saegim> saegimList = saegimRepository.findByUserId(userId);
		saegimList.forEach(saegim->saegim.setTaggings(taggingRepository.findBySaegimId(saegim.getId())));
		return saegimList.stream()
				.map(saegim->SaegimDto.of(saegim))
				.collect(Collectors.toList());
	}
	@Override
	public List<SaegimDto> getSaegims() {
		List<Saegim> saegimList = saegimRepository.findAll();
		saegimList.forEach(saegim->saegim.setTaggings(taggingRepository.findBySaegimId(saegim.getId())));
		return saegimList.stream()
				.map(saegim->SaegimDto.of(saegim))
				.collect(Collectors.toList());
	}
	@Override
	public Long getSaegimCount() {
		return saegimRepository.count();
	}

	@Override
	public List<SaegimDto> getSaegimsByGeo(double lat, double lng, int meter) {
		List<Saegim> saegimList = new ArrayList<Saegim>();
		for (Saegim saegim : saegimRepository.findAll()) {
			if(distance(saegim.getLatitude(), saegim.getLongitude(), lat, lng) <= meter)
				saegimList.add(saegim);
		}
		saegimList.forEach(saegim->saegim.setTaggings(taggingRepository.findBySaegimId(saegim.getId())));
		return saegimList.stream()
				.map(saegim->SaegimDto.of(saegim))
				.collect(Collectors.toList());
	}
	@Override
	public Long deleteSaegimBySid(long saegimid) {
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
