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
    @GeneratedValue(strategy = GenerationType.TABLE)
	private Long id;
	
	@NonNull
	private String name;
	
	@JsonIgnore
	@OneToMany(mappedBy="HASHTAG", fetch = FetchType.LAZY)
	private List<Tagging> taggings = new ArrayList<Tagging>();
}
