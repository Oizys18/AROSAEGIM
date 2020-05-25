package com.ssafy.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import lombok.*;

@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class SaegimDto {
	@NonNull
	private Long id;
	@NonNull
    private Long uId;
	@NonNull
    private String uName;
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
    private int secret;
    
	private List<LikesDto> likes = new ArrayList<LikesDto>();
    private List<HashtagDto> tags = new ArrayList<HashtagDto>(); 
    private List<CommentDto> comments = new ArrayList<CommentDto>(); 
}
