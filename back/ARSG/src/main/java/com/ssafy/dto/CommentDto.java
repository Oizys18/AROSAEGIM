package com.ssafy.dto;

import java.util.Date;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class CommentDto {
	private Long id; 
	private Long saegim_id;
	private Long user_id;
	private String user_name;
	private Date regDate;
	private String contents;
}
