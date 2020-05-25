package com.ssafy.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import lombok.*;

@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class SaegimFormDto {
	@NonNull
    private Long uId;
	@NonNull
    private String uName;
	@NonNull
    private String regDate;
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
    
    private List<String> tags = new ArrayList<String>(); 
}
