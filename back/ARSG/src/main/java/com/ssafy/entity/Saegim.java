package com.ssafy.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Entity
@NoArgsConstructor @RequiredArgsConstructor @AllArgsConstructor
@Getter @Setter
@Table(name = "saegim")
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
    private Double longitude;
    private Double latitude;
    private String w3w;
    private String image;
    private String record;
    private int secret;
    
//	private List<Likes> likes = new ArrayList<Likes>();
//    @Transient
    @OneToMany(mappedBy="saegim", fetch = FetchType.EAGER)
	private List<Favorite> Favorites = new ArrayList<Favorite>();
    
    
}