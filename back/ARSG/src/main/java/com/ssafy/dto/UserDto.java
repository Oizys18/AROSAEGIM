package com.ssafy.dto;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializable;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.jsontype.TypeSerializer;

import lombok.*;

@NoArgsConstructor
@RequiredArgsConstructor
@Getter @Setter
public class UserDto {
	@NonNull
	private Long id;
	@NonNull
	private String email;
	@NonNull
	private String name;
	@NonNull
	private String password;

	private List<LikesDto> likes = new ArrayList<LikesDto>();

}
