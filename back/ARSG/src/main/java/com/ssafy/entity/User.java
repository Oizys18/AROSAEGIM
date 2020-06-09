package com.ssafy.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.*;

import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.configuration.ConfigurationUtilFactory;
import com.ssafy.dto.UserFormDto;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.*;

@Entity
@NoArgsConstructor @RequiredArgsConstructor @AllArgsConstructor
@Getter @Setter
@Table(name = "users")
@Transactional
public class User {
	@Id
	@GeneratedValue
	@ApiParam(hidden = true)
	private Long id;
	@NonNull
	private String email;
	@NonNull
	private String name;
	@NonNull
	private String password;

	@OneToMany(mappedBy="USER", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@ApiModelProperty(hidden = true)
	private Set<Likes> likes = new HashSet<Likes>();
	
	public static User of(UserFormDto userFormDto) {
		return ConfigurationUtilFactory.modelmapper().map(userFormDto, User.class);
	}
}