package com.ssafy.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Table(name = "saegim")
@Getter @Setter
public class Saegim {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @ApiModelProperty(hidden=true)
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
    
    @Transient
	private List<Likes> likes = new ArrayList<Likes>();
//    @OneToMany(mappedBy="saegim", fetch = FetchType.LAZY)
//    @JsonBackReference
//	private List<Users_Saegim> likes = new ArrayList<Users_Saegim>();
}