package com.ssafy.dto;

import java.util.Date;

import com.ssafy.entity.Comment;
import com.ssafy.util.UtilFactory;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
		CommentDto dto = UtilFactory.getModelMapper().map(comment, CommentDto.class);
		return dto;
	}
}
