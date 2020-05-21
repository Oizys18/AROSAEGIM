package com.ssafy.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;

@Entity
@NoArgsConstructor
@RequiredArgsConstructor
@Getter @Setter
@Table(name="hashtag")
public class Hashtag {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@NonNull
	private String name;
	
//	@JsonIgnore
//	@OneToMany(mappedBy="hashtag", fetch = FetchType.EAGER)
//	private List<Tagging> taggings = new ArrayList<Tagging>();
}
