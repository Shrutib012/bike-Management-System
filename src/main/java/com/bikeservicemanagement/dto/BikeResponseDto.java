package com.bikeservicemanagement.dto;

import lombok.Data;

@Data
public class BikeResponseDto {
	
    private int id;
	
	private String name;
	
	private int userId;
	
	private String modelNo;
	
	private String registrationNo;
	
	private String company;
	
	private String customerName;
	
	private String customerContact;

}
