package com.bikeservicemanagement.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bikeservicemanagement.dto.BikeListResponseDto;
import com.bikeservicemanagement.dto.BikeResponseDto;
import com.bikeservicemanagement.dto.CommonApiResponse;
import com.bikeservicemanagement.entity.Bike;
import com.bikeservicemanagement.entity.User;
import com.bikeservicemanagement.service.BikeService;
import com.bikeservicemanagement.service.UserService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("api/bike/")
@CrossOrigin(origins = "http://localhost:3000")
public class BikeController {
	
	Logger LOG = LoggerFactory.getLogger(BikeController.class);
	
	@Autowired
	private BikeService bikeService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("add")
	@ApiOperation(value = "Api to add any bike")
	public ResponseEntity<CommonApiResponse> register(@RequestBody Bike bike) {
		LOG.info("Recieved request for adding bike");

		CommonApiResponse response = new CommonApiResponse();
		
		if (bike == null) {
			response.setResponseMessage("Bad Request, improper request data");
			response.setSuccess(true);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}
		
		if(bike.getUserId() == 0) {
			response.setResponseMessage("Bad Request, user id is missing");
			response.setSuccess(true);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		if (bikeService.addBike(bike) != null) {
			
			LOG.info("bike added sucessfully!!!");
			
			response.setResponseMessage("Bike Added Successful");
			response.setSuccess(true);
			response.setStatus(HttpStatus.OK);
		}

		else {
			response.setResponseMessage("Failed to add the Bike");
			response.setSuccess(true);
           
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping("all")
	@ApiOperation(value = "Api to fetch all Bike")
	public ResponseEntity<BikeListResponseDto> getAllBike() {
		LOG.info("Recieved request for fetching all bike");

		BikeListResponseDto response = new BikeListResponseDto();
		
		List<Bike> bikes = this.bikeService.getAllBike();
		
		List<BikeResponseDto> bikeDto = new ArrayList<>();
		
		for(Bike bike : bikes) {
            BikeResponseDto b = new BikeResponseDto();
			
			User customer = userService.getUserById(bike.getUserId());
			
			b.setCompany(bike.getCompany());
			b.setCustomerContact(customer.getContact());
			b.setCustomerName(customer.getFirstName() + " "+customer.getLastName());
			b.setId(bike.getId());
			b.setModelNo(bike.getModelNo());
			b.setRegistrationNo(bike.getRegistrationNo());
			b.setUserId(customer.getId());	
			b.setName(bike.getName());
			
			bikeDto.add(b);
		}
		
		LOG.info("bike fetched sucessfully!!!");
		
		response.setBikes(bikeDto);
		response.setResponseMessage("Bike Fetched Successful");
		response.setSuccess(true);
		response.setStatus(HttpStatus.OK);
		
		
		return new ResponseEntity<BikeListResponseDto>(response, HttpStatus.OK);
	}
	
	@GetMapping("fetch")
	@ApiOperation(value = "Api to fetch all Bike service by user id")
	public ResponseEntity<BikeListResponseDto> getAllBikeByUserId(@RequestParam("userId") int userId) {
		LOG.info("Recieved request for fetching bike by using user Id");

		BikeListResponseDto response = new BikeListResponseDto();
		
		if(userId == 0) {
			response.setResponseMessage("Failed to Fetch the Bike");
			response.setSuccess(true);
			
			return new ResponseEntity<BikeListResponseDto>(response, HttpStatus.BAD_REQUEST);
		}
		
        List<Bike> bikes = this.bikeService.getBikeByUserId(userId);
		
		List<BikeResponseDto> bikeDto = new ArrayList<>();
		
		for(Bike bike : bikes) {
			BikeResponseDto b = new BikeResponseDto();
			
			User customer = userService.getUserById(bike.getUserId());
			
			b.setCompany(bike.getCompany());
			b.setCustomerContact(customer.getContact());
			b.setCustomerName(customer.getFirstName() + " "+customer.getLastName());
			b.setId(bike.getId());
			b.setModelNo(bike.getModelNo());
			b.setRegistrationNo(bike.getRegistrationNo());
			b.setUserId(customer.getId());	
			b.setName(bike.getName());
			
			bikeDto.add(b);
		}
		
        LOG.info("bike fetched sucessfully!!!");
		
		response.setBikes(bikeDto);
		response.setResponseMessage("Bike Fetched Successful");
		response.setSuccess(true);
		response.setStatus(HttpStatus.OK);
		
		
		return new ResponseEntity<BikeListResponseDto>(response, HttpStatus.OK);
	}

}
