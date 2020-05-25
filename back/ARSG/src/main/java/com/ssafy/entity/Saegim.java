package com.ssafy.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    private Long uId;
    
    @NonNull
    @Column(name="user_name", nullable=false)
    private String uName;
    
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
    
    @OneToMany(mappedBy="saegim", fetch = FetchType.EAGER)
	private Set<Likes> likes;
    
//    @OneToMany(mappedBy="saegim", fetch = FetchType.LAZY)
//	private List<Tagging> taggings = new ArrayList<Tagging>();

}