package com.ssafy.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.*;

import org.modelmapper.PropertyMap;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.configuration.ConfigurationUtilFactory;
import com.ssafy.dto.LikesDto;
import com.ssafy.dto.SaegimDetailDto;
import com.ssafy.dto.SaegimDto;
import com.ssafy.dto.SaegimFormDto;

import lombok.*;

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
    	Saegim saegim = ConfigurationUtilFactory.modelmapper().map(saegimFormDto, Saegim.class);
    	return saegim;
    }
}