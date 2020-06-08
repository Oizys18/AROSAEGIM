package com.ssafy.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.entity.Saegim;

public interface SaegimRepository extends JpaRepository<Saegim, Integer> {
	Saegim findById(Long id);
	List<Saegim> findByUserId(Long userId);
	List<Saegim> findAll();
	long count();
	
	@Transactional
	Long removeById(Long id);
	
	String updatePointQuery = "UPDATE saegim SET point=ST_GEOMFROMTEXT(:point) WHERE id= :sid";
	@Modifying
	@Transactional
	@Query(nativeQuery=true, value=updatePointQuery)
	void savePointInSaegim(Long sid, String point);
	
	String selectLatLngQuery = 
			"SELECT id "
			+ "FROM saegim AS s "
			+ "WHERE MBRCONTAINS(ST_LINEFROMTEXT(CONCAT('LINESTRING(', :lat1, ' ', :lng1, ',', :lat2, ' ', :lng2, ')')), s.point)";
	@Modifying
	@Transactional
	@Query(nativeQuery=true, value=selectLatLngQuery)
	List<Long> findSomething(String lat1, String lng1, String lat2, String lng2);
	
}
