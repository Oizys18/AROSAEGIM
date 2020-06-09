package com.ssafy.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.PropertyMap;

import com.ssafy.configuration.ConfigurationUtilFactory;
import com.ssafy.entity.Hashtag;
import com.ssafy.entity.Saegim;
import com.ssafy.entity.User;

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
	@NonNull
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
    private String image;
    private String record;
    private Integer secret;
    private List<HashtagDto> tags = new ArrayList<HashtagDto>(); 
    
    public static SaegimDto of(Saegim saegim) {
    	PropertyMap<Saegim, SaegimDto> saegimMap = new PropertyMap<Saegim, SaegimDto>() {
    		@Override
    		protected void configure() {
    			List<HashtagDto> hashtagsDto
    			= saegim.getTaggings().stream()
    			.map(tagging->HashtagDto.of(tagging))
    			.collect(Collectors.toList());
    			
    			map().setTags(hashtagsDto);
    		}
    	};
    	if(ConfigurationUtilFactory.modelmapper().getTypeMap(Saegim.class, SaegimDto.class) == null)
    		ConfigurationUtilFactory.modelmapper().addMappings(saegimMap);
    	
    	SaegimDto dto = ConfigurationUtilFactory.modelmapper().map(saegim, SaegimDto.class);
    	return dto;
    }
}
