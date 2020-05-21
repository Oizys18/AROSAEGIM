package com.ssafy.entity;

import java.io.Serializable;

import javax.persistence.*;

import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@IdClass(LikesId.class)
@Transactional
public class Likes implements Serializable {
	private static final long serialVersionUID = 1L;
	
//	@EmbeddedId
//	private LikeId likeId;
	@Id
	private Long saegim_id;
	@Id
	private Long user_id;
	
	@JsonIgnore
	@ManyToOne @JoinColumn(name = "saegim_id", insertable=false, updatable=false)
	private Saegim saegim;
	
	@JsonIgnore
	@ManyToOne @JoinColumn(name = "user_id", insertable=false, updatable=false)
	private User user;
}
