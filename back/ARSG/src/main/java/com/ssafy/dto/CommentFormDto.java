package com.ssafy.dto;

import java.util.Date;

import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class CommentFormDto {
	@NonNull
    private Long userId;
	@NonNull
	private String contents;
	@ApiParam(hidden = true)
	private Date regDate = new Date();
}
