package com.ssafy.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.ssafy.dto.CommentFormDto;
import com.ssafy.util.UtilFactory;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Table(name = "comment")
public class Comment {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@NonNull
	@Column(name="saegim_id", nullable=false)
	private Long saegimId;
	@NonNull
	@Column(name="user_id", nullable=false)
	private Long userId;
	private String userName;
	@NonNull
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="registered_datetime", nullable=false)
    private Date regDate;
	@NonNull
	private String contents;
	
	@ManyToOne(fetch = FetchType.EAGER) @JoinColumn(name = "saegim_id", insertable=false, updatable=false)
	private Saegim SAEGIM;

	public static Comment of(CommentFormDto commentFormDto) {
		return UtilFactory.getModelMapper().map(commentFormDto, Comment.class);
	}
}
