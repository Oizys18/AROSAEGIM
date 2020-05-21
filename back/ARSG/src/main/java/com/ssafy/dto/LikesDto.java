package com.ssafy.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class LikesDto {
	private Long saegim_id;
	private Long user_id;
	private String user_name;
	private String writer_name;
}
