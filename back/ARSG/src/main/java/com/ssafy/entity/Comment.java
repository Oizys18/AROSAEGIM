package com.ssafy.entity;

import java.time.LocalDateTime;
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

import com.ssafy.configuration.ConfigurationUtilFactory;
import com.ssafy.dto.CommentFormDto;

import lombok.*;

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
	@NonNull
	@Column(name="user_name", nullable=false)
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
		return ConfigurationUtilFactory.modelmapper().map(commentFormDto, Comment.class);
	}
}
