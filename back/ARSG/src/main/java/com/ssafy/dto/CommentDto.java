package com.ssafy.dto;

import java.util.Date;

import com.ssafy.configuration.ConfigurationUtilFactory;
import com.ssafy.entity.Comment;
import com.ssafy.entity.Tagging;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class CommentDto {
	private Long id; 
	private Long saegimId;
	private Long userId;
	private String userName;
	private Date regDate;
	private String contents;
	
	public static CommentDto of(Comment comment) {
		CommentDto dto = ConfigurationUtilFactory.modelmapper().map(comment, CommentDto.class);
		return dto;
	}
}
