package com.bikeservicemanagement.dto;

import java.util.List;

import lombok.Data;

@Data
public class BookingListResponseDto extends CommonApiResponse {
	
	private List<BookingResponseDto> bookings; 

}
