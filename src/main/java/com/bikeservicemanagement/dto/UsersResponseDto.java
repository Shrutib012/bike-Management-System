package com.bikeservicemanagement.dto;

import java.util.List;

import com.bikeservicemanagement.entity.User;

import lombok.Data;

@Data
public class UsersResponseDto extends CommonApiResponse {
	
	private List<User> users;

}
