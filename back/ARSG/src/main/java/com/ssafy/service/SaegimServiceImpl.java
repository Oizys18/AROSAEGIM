package com.ssafy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.entity.Saegim;
import com.ssafy.repositories.LikeRepository;
import com.ssafy.repositories.SaegimRepository;

@Service
public class SaegimServiceImpl implements SaegimService {
	@Autowired
	private SaegimRepository saegimRepository;
	@Autowired
	private LikeRepository likeRepository;
	
	@Override
	public Saegim getSaegim(long sId) {
		Saegim saegim = saegimRepository.findByid(sId);
		return saegim;
//				.orElseThrow(() -> 
//        		new RestException(HttpStatus.NOT_FOUND, "Not found board"));
	}
	@Override
	public Saegim postSaegim(Saegim saegim) {
		return saegimRepository.save(saegim);
	}
	@Override
	public List<Saegim> getSaegimsByUid(long uid) {
		List<Saegim> list = saegimRepository.findByuId(uid);
//		for (Saegim saegim : list) {
//			saegim.setLikes(likeRepository.findByuId(saegim.getId()));
//		}
		return list;
	}
	@Override
	public List<Saegim> getSaegims() {
		List<Saegim> list = saegimRepository.findAll();
//		for (Saegim saegim : list) {
//			saegim.setLikes(likeRepository.findByuId(saegim.getId()));
//		}
		return list;
	}
	@Override
	public Long getSaegimCount() {
		return saegimRepository.count();
	}
}
