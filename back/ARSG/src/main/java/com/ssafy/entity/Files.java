package com.ssafy.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.transaction.annotation.Transactional;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor @RequiredArgsConstructor
@Getter @Setter
@Table(name = "files")
@Transactional
public class Files {
	@Id
	@GeneratedValue
	private Long id;
	@NonNull
	@Column(name="saegim_id", nullable=false)
	private Long saegimId;
	@NonNull
	private String extension;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "saegim_id", insertable=false, updatable=false)
	private Saegim SAEGIM;
}
