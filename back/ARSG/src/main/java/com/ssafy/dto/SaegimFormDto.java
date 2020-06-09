package com.ssafy.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import lombok.*;

@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class SaegimFormDto {
	@NonNull
    private Long userId;
	@NonNull
    private String userName;
	@NonNull
    private String contents;
	@NonNull
    private Double latitude;
	@NonNull
    private Double longitude;
	@NonNull
    private String w3w;
	@NonNull
	private Integer secret;
//    private String image;
//    private String record;
    
	@ApiParam(hidden = true)
	private Date regDate = new Date();
    private List<String> tags = new ArrayList<String>(); 
}
