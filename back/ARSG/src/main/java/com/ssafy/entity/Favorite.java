package com.ssafy.entity;

import java.io.Serializable;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.common.primitives.UnsignedLong;

import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@IdClass(FavoriteId.class)
public class Favorite implements Serializable {
	private static final long serialVersionUID = 1L;
	
//	@EmbeddedId
//	private FavoriteId favoriteId;
	@Id
	private Long saegim_id;
	@Id
	private Long user_id;
	
//	@Transient
	@JsonIgnore
	@ManyToOne @JoinColumn(name = "saegim_id", insertable=false, updatable=false)
	private Saegim saegim;
	
//	@Transient 
	@JsonIgnore
	@ManyToOne @JoinColumn(name = "user_id", insertable=false, updatable=false)
	private User user;
}
