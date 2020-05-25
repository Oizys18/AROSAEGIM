package com.ssafy.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class LoginFormDto {
	private String email;
	private String password;
}
