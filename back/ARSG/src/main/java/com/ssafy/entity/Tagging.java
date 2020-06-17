package com.ssafy.entity;

import java.io.Serializable;

import javax.persistence.*;

import lombok.*;

@Entity
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Getter @Setter
@IdClass(TaggingId.class)
public class Tagging  implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id @NonNull
	@Column(name="tag_id", nullable=false)
	private Long tagId;
	@Id @NonNull
	@Column(name="saegim_id", nullable=false)
	private Long saegimId;
	
	@ManyToOne @JoinColumn(name = "saegim_id", insertable=false, updatable=false)
	private Saegim SAEGIM;
	
	@ManyToOne @JoinColumn(name = "tag_id", insertable=false, updatable=false)
	private Hashtag HASHTAG;

	public static Tagging of(Hashtag tag, Saegim saegim) {
		return new Tagging(tag.getId(), saegim.getId());
	}

}