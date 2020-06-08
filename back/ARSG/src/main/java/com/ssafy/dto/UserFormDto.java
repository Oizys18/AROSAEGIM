package com.ssafy.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@RequiredArgsConstructor
@Getter @Setter
public class UserFormDto {
	@NonNull
	private String email;
	@NonNull
	private String name;
	@NonNull
	private String password;
	
	private String profileImage;
}
