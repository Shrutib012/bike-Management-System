package com.bikeservicemanagement.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class UpdateBookingStatusRequestDto {
	
	private int bookingId;
	
	private String status;
	
	private String serviceStatus;
	
	private String paymentMode;
	
	private BigDecimal serviceFee;

}
