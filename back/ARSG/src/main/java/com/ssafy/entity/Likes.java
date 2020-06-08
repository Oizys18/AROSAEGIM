package com.ssafy.entity;

import java.io.Serializable;

import javax.persistence.*;

import org.springframework.transaction.annotation.Transactional;

import lombok.*;

@Entity
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Getter @Setter
@IdClass(LikesId.class)
@Transactional
@Table(name="likes")
public class Likes implements Serializable {
	private static final long serialVersionUID = 1L;
	
//	@EmbeddedId
//	private LikeId likeId;
	@Id @NonNull
	@Column(name="saegim_id", nullable=false)
	private Long saegimId;
	@Id @NonNull
	@Column(name="user_id", nullable=false)
	private Long userId;
	
	@ManyToOne(fetch = FetchType.EAGER) @JoinColumn(name = "saegim_id", insertable=false, updatable=false)
	private Saegim SAEGIM;
	
	@ManyToOne(fetch = FetchType.EAGER) @JoinColumn(name = "user_id", insertable=false, updatable=false)
	private User USER;
}
