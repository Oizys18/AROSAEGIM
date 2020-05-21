package com.ssafy.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

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
	private Long sId;
	@NonNull
	@Column(name="user_id", nullable=false)
	private Long uId;
	@NonNull
	private String user_name;
	@NonNull
	@Column(name="registered_datetime", nullable=false)
	private Date regDate;
	@NonNull
	private String contents;
}
