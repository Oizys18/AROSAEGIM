package com.ssafy.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;

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
public class SaegimDetailDto {
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
    
	private List<LikesDto> likes = new ArrayList<LikesDto>();
    private List<HashtagDto> tags = new ArrayList<HashtagDto>(); 
    private List<CommentDto> comments = new ArrayList<CommentDto>();
    private List<FileDto> files = new ArrayList<FileDto>();
    
    public static SaegimDetailDto of(Saegim saegim) {
    	PropertyMap<Saegim, SaegimDetailDto> saegimDetailMap = new PropertyMap<Saegim, SaegimDetailDto>() {
    		@Override
    		protected void configure() {
    			List<LikesDto> likesDto
    			= saegim.getLikes().stream()
    			.map(likes->LikesDto.of(likes))
    			.collect(Collectors.toList());
    			map().setLikes(likesDto);
    			
    			List<HashtagDto> hashtagsDto
    			= saegim.getTaggings().stream()
    			.map(tagging->HashtagDto.of(tagging))
    			.collect(Collectors.toList());
    			map().setTags(hashtagsDto);
    			
    			List<CommentDto> commentDto
    			= saegim.getComments().stream()
    			.map(comment->CommentDto.of(comment))
    			.collect(Collectors.toList());
    			map().setComments(commentDto);

    			List<FileDto> fileDtos
    			= saegim.getFiles().stream()
    			.map(file->FileDto.of(file))
    			.collect(Collectors.toList());
    			map().setFiles(fileDtos);
    		}
    	};
    	ModelMapper modelMapper = UtilFactory.getModelMapper();
    	modelMapper.addMappings(saegimDetailMap);
    	
    	SaegimDetailDto dto = modelMapper.map(saegim, SaegimDetailDto.class);
    	return dto;
    }
}
