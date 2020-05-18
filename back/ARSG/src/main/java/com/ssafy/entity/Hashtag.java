package com.ssafy.entity;

import javax.persistence.*;

import lombok.*;

@Entity
@RequiredArgsConstructor
@Table(name="hashtag")
@Getter @Setter
public class Hashtag {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@NonNull
    @Column(name="user_id", nullable=false)
	private String name;
}
