package com.bikeservicemanagement.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bikeservicemanagement.dao.BikeDao;
import com.bikeservicemanagement.entity.Bike;

@Service
public class BikeService {
	
	@Autowired
	private BikeDao bikeDao;	
	
	public Bike addBike(Bike bike) {
		return bikeDao.save(bike);
	}
	
	public Bike getBikeById(int id) {
		return bikeDao.findById(id).get();
	}
	
	public List<Bike> getAllBike() {
		return bikeDao.findAll();
	}
	
	public List<Bike> getBikeByUserId(int userId) {
		return bikeDao.findByUserId(userId);
	}	

}
