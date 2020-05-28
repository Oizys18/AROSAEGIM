package com.ssafy.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.dto.UserFormDto;
import com.ssafy.util.UtilFactory;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

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
	
	@Column(name="profile_image")
	private String profileImage;

	@OneToMany(mappedBy="USER", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@ApiModelProperty(hidden = true)
	private Set<Likes> likes = new HashSet<Likes>();
	
	public static User of(UserFormDto userFormDto) {
		return UtilFactory.getModelMapper().map(userFormDto, User.class);
	}
}