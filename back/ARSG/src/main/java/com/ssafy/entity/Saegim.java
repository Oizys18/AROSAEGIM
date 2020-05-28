package com.ssafy.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.dto.SaegimFormDto;
import com.ssafy.util.UtilFactory;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor @RequiredArgsConstructor @AllArgsConstructor
@Getter @Setter
@Table(name = "saegim")
@Transactional
public class Saegim {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @NonNull
    @Column(name="user_id", nullable=false)
    private Long userId;
    
    @NonNull
    @Column(name="user_name", nullable=false)
    private String userName;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="registered_datetime", nullable=false)
    private Date regDate;
    
    private String contents;
    private Double latitude;
    private Double longitude;
    private String w3w;
    private String image;
    private String record;
    private Integer secret;
    
    @OneToMany(mappedBy="SAEGIM", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<Likes> likes = new HashSet<Likes>();
    
    @OneToMany(mappedBy="SAEGIM", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Tagging> taggings = new ArrayList<Tagging>();
    
    @OneToMany(mappedBy="SAEGIM", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Comment> comments = new HashSet<Comment>();
    
    public static Saegim of(SaegimFormDto saegimFormDto) {
    	Saegim saegim = UtilFactory.getModelMapper().map(saegimFormDto, Saegim.class);
    	return saegim;
    }
}