package com.bikeservicemanagement.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.bikeservicemanagement.entity.Bike;

@Repository
public interface BikeDao extends JpaRepository<Bike, Integer> {
	
	List<Bike> findByUserId(int bikeId);

}
