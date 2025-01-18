package com.bikeservicemanagement.dto;

import java.util.List;

import lombok.Data;

@Data
public class BikeListResponseDto extends CommonApiResponse {
	
	List<BikeResponseDto> bikes;

}
