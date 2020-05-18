package com.ssafy.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Entity
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Table(name = "users")
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

	@Transient
	@ApiModelProperty(hidden=true)
	private List<Likes> likes = new ArrayList<Likes>();
//	@OneToMany(mappedBy="user", fetch = FetchType.LAZY)
//	@JsonBackReference
//	private List<Users_Saegim> likes = new ArrayList<Users_Saegim>();
}