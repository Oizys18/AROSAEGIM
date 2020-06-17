package com.ssafy.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.dto.HashtagDto;
import com.ssafy.dto.TaggingDto;
import com.ssafy.repositories.TaggingRepository;

@Service
public class HashtagServiceImpl implements HashtagService {
	@Autowired
	private TaggingRepository taggingRepository;

	@Override
	public List<HashtagDto> getHashtags() {
		return taggingRepository.findAll().stream()
				.map(tag->HashtagDto.of(tag))
				.collect(Collectors.toList());
	}
	@Override
	public List<TaggingDto> getTaggingsBySaegimId(Long saegimId) {
		return taggingRepository.findBySaegimId(saegimId).stream()
				.map(tag->TaggingDto.of(tag))
				.collect(Collectors.toList());
	}
	@Override
	public List<TaggingDto> getTaggingsByTagId(Long tagId) {
		return taggingRepository.findByTagId(tagId).stream()
				.map(tag->TaggingDto.of(tag))
				.collect(Collectors.toList());
	}
}
