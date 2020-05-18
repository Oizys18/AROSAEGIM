package com.ssafy.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="registered_datetime", nullable=false)
    private Date regDate;
    
    private String contents;
    private String address_w3w;
    private String image;
    private String record;
    private Double longitude;
    private Double latitude;
    
//	private List<Likes> likes = new ArrayList<Likes>();
//    @Transient
    @OneToMany(mappedBy="saegim", fetch = FetchType.EAGER)
	private List<Favorite> Favorites = new ArrayList<Favorite>();
}