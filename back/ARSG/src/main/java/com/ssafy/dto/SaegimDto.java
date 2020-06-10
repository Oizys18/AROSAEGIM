package com.ssafy.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;

import com.ssafy.entity.Files;
import com.ssafy.entity.Saegim;
import com.ssafy.util.UtilFactory;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class SaegimDto {
	@NonNull
	private Long id;
	@NonNull
    private Long userId;
    private String userName;
	@NonNull
    private Date regDate;
	@NonNull
    private String contents;
	@NonNull
    private Double latitude;
	@NonNull
    private Double longitude;
	@NonNull
    private String w3w;
    private String record;
    private Integer secret;
    private String password;
    
    private Integer filesCount;
    
    private List<HashtagDto> tags = new ArrayList<HashtagDto>();
    
    public static SaegimDto of(Saegim saegim) {
    	PropertyMap<Saegim, SaegimDto> saegimMap = new PropertyMap<Saegim, SaegimDto>() {
    		@Override
    		protected void configure() {
    			List<HashtagDto> hashtagDtos
    			= saegim.getTaggings().stream()
    			.map(tagging->HashtagDto.of(tagging))
    			.collect(Collectors.toList());
    			map().setTags(hashtagDtos);
    			
    			List<Files> filesList = saegim.getFiles();
    			int filecount = filesList.size();
    			map().setFilesCount(filecount);
    		}
    	};
    	ModelMapper modelMapper = UtilFactory.getModelMapper();
    	modelMapper.addMappings(saegimMap);
    	SaegimDto dto = modelMapper.map(saegim, SaegimDto.class);
    	return dto;
    }
}
