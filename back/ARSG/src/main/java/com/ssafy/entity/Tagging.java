package com.ssafy.entity;

import java.io.Serializable;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@IdClass(TaggingId.class)
public class Tagging  implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	private Long tag_id;
	@Id
	private Long saegim_id;
	
//	@JsonIgnore
//	@ManyToOne @JoinColumn(name = "saegim_id", insertable=false, updatable=false)
//	private Saegim saegim;
//	
//	@JsonIgnore
//	@ManyToOne @JoinColumn(name = "tag_id", insertable=false, updatable=false)
//	private Hashtag hashtag;
}