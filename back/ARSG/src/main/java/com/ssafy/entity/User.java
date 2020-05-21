package com.ssafy.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Entity
@NoArgsConstructor @RequiredArgsConstructor @AllArgsConstructor
@Getter @Setter
@Table(name = "users")
@Transactional
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ApiModelProperty(hidden=true)
	private Long id;
	@NonNull
	private String email;
	@NonNull
	private String name;
	@NonNull
	private String password;

//	@ApiModelProperty(hidden=true)
//	private List<Likes> likes = new ArrayList<Likes>();
//	@Transient
	@OneToMany(mappedBy="user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<Likes> likes;
}