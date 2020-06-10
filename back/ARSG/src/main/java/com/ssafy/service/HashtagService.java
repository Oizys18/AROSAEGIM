package com.ssafy.service;

import java.util.List;

import com.ssafy.dto.HashtagDto;
import com.ssafy.dto.TaggingDto;

public interface HashtagService {
	public List<HashtagDto> getHashtags();
	public List<TaggingDto> getTaggingsBySaegimId(Long saegimId);
	public List<TaggingDto> getTaggingsByTagId(Long tagId);
}
