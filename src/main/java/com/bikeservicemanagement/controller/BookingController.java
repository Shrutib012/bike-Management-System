package com.bikeservicemanagement.controller;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
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

import com.bikeservicemanagement.dto.BookingListResponseDto;
import com.bikeservicemanagement.dto.BookingResponseDto;
import com.bikeservicemanagement.dto.CommonApiResponse;
import com.bikeservicemanagement.dto.UpdateBookingStatusRequestDto;
import com.bikeservicemanagement.entity.Bike;
import com.bikeservicemanagement.entity.Booking;
import com.bikeservicemanagement.entity.User;
import com.bikeservicemanagement.service.BikeService;
import com.bikeservicemanagement.service.BookingService;
import com.bikeservicemanagement.service.UserService;
import com.bikeservicemanagement.utility.Constants.BookingStatus;
import com.bikeservicemanagement.utility.Constants.PaymentMode;
import com.bikeservicemanagement.utility.Constants.PaymentStatus;
import com.bikeservicemanagement.utility.Constants.ServiceStatus;
import com.bikeservicemanagement.utility.Helper;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("api/book/bike")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

	Logger LOG = LoggerFactory.getLogger(BookingController.class);

	@Autowired
	private BookingService bookingService;

	@Autowired
	private UserService userService;

	@Autowired
	private BikeService bikeService;

	@PostMapping("service")
	@ApiOperation(value = "Api to book service")
	public ResponseEntity<CommonApiResponse> book(@RequestBody Booking booking) {
		LOG.info("Recieved request for booking");

		System.out.println(booking);

		CommonApiResponse response = new CommonApiResponse();

		if (booking == null) {
			response.setResponseMessage("Bad request, booking data missing!!!");
			response.setSuccess(true);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		if (booking.getUserId() == 0) {
			response.setResponseMessage("Bad request, user id is missing");
			response.setSuccess(true);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		if (booking.getBikeId() == 0) {
			response.setResponseMessage("Bad request, bike id is missing");
			response.setSuccess(true);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		Bike bike = bikeService.getBikeById(booking.getBikeId());

		if (bike == null) {
			response.setResponseMessage("bike not found");
			response.setSuccess(true);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		booking.setBookingDate(LocalDate.now().toString());
		booking.setStatus(BookingStatus.PENDING.value());
		booking.setBookingId(Helper.getAlphaNumericId());
		booking.setServiceFee(BigDecimal.ZERO);
		booking.setServiceStatus(ServiceStatus.PENDING.value());
		booking.setPaymentMode(BookingStatus.PENDING.value());
		booking.setPaymentStatus(PaymentStatus.PENDING.value());

		Booking bookedService = this.bookingService.addBooking(booking);

		if (bookedService != null) {
			response.setSuccess(true);
			response.setResponseMessage("Bike Booked Successfully, Please Check Approval Status on Booking Option");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}

		else {
			response.setSuccess(true);
			response.setResponseMessage("Failed to Book Bike Service");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/fetch/all")
	@ApiOperation(value = "Api to fetch all booked service")
	public ResponseEntity<?> fetchAllBookings() {
		LOG.info("Recieved request for fetch all booking");

		BookingListResponseDto response = new BookingListResponseDto();

		List<BookingResponseDto> bookings = new ArrayList<>();

		List<Booking> allBookings = this.bookingService.getAllBooking();

		for (Booking booking : allBookings) {

			BookingResponseDto b = new BookingResponseDto();

			User customer = this.userService.getUserById(booking.getUserId());
			Bike bike = this.bikeService.getBikeById(booking.getBikeId());

			b.setBookingId(booking.getBookingId());
			b.setCustomerContact(customer.getContact());
			b.setCustomerName(customer.getFirstName() + " " + customer.getLastName());
			b.setBookDate(booking.getBookDate());
			b.setBookingDate(booking.getBookingDate());
			b.setBikeId(booking.getBikeId());
			b.setBikeName(bike.getName());
			b.setModelNo(bike.getModelNo());
			b.setRegistrationNo(bike.getRegistrationNo());
			b.setCompany(bike.getCompany());
			b.setId(booking.getId());
			b.setStatus(booking.getStatus());
			b.setUserId(customer.getId());
			b.setServiceFee(booking.getServiceFee());
			b.setServiceStatus(booking.getServiceStatus());
			b.setPaymentMode(booking.getPaymentMode());
			b.setPaymentStatus(booking.getPaymentStatus());

			bookings.add(b);
		}

		response.setBookings(bookings);
		response.setSuccess(true);
		response.setResponseMessage("Successfully fetched all the bookings");
		return new ResponseEntity<BookingListResponseDto>(response, HttpStatus.OK);

	}

	@GetMapping("/fetch")
	@ApiOperation(value = "Api to fetch my booked ground")
	public ResponseEntity<BookingListResponseDto> fetchMyBooking(@RequestParam("userId") int userId) {
		LOG.info("Recieved request for fetch all booking by using userId");

		BookingListResponseDto response = new BookingListResponseDto();

		if (userId == 0) {
			response.setSuccess(true);
			response.setResponseMessage("bad request, user id is missing");
			return new ResponseEntity<BookingListResponseDto>(response, HttpStatus.BAD_REQUEST);
		}

		List<BookingResponseDto> bookings = new ArrayList<>();

		List<Booking> allBookings = this.bookingService.getBookingsByUserId(userId);

		for (Booking booking : allBookings) {

			BookingResponseDto b = new BookingResponseDto();

			User customer = this.userService.getUserById(booking.getUserId());
			Bike bike = this.bikeService.getBikeById(booking.getBikeId());

			b.setBookingId(booking.getBookingId());
			b.setCustomerContact(customer.getContact());
			b.setCustomerName(customer.getFirstName() + " " + customer.getLastName());
			b.setBookDate(booking.getBookDate());
			b.setBookingDate(booking.getBookingDate());
			b.setBikeId(booking.getBikeId());
			b.setBikeName(bike.getName());
			b.setModelNo(bike.getModelNo());
			b.setRegistrationNo(bike.getRegistrationNo());
			b.setCompany(bike.getCompany());
			b.setId(booking.getId());
			b.setStatus(booking.getStatus());
			b.setUserId(customer.getId());
			b.setServiceFee(booking.getServiceFee());
			b.setServiceStatus(booking.getServiceStatus());
			b.setPaymentMode(booking.getPaymentMode());
			b.setPaymentStatus(booking.getPaymentStatus());

			bookings.add(b);
		}

		response.setBookings(bookings);
		response.setSuccess(true);
		response.setResponseMessage("Successfully fetched all the bookings");
		return new ResponseEntity<BookingListResponseDto>(response, HttpStatus.OK);

	}

	@GetMapping("/fetch/bookingId")
	@ApiOperation(value = "Api to fetch booking by booking id")
	public ResponseEntity<BookingListResponseDto> fetchBooking(@RequestParam("id") int bookingId) {
		LOG.info("Recieved request for fetch all booking by booking Id ");

		BookingListResponseDto response = new BookingListResponseDto();

		if (bookingId == 0) {
			response.setSuccess(true);
			response.setResponseMessage("bad request, booking id is missing");
			return new ResponseEntity<BookingListResponseDto>(response, HttpStatus.BAD_REQUEST);
		}

		Booking booking = this.bookingService.getBookById(bookingId);

		if (booking == null) {
			response.setSuccess(true);
			response.setResponseMessage("booking not found");
			return new ResponseEntity<BookingListResponseDto>(response, HttpStatus.BAD_REQUEST);
		}

		BookingResponseDto b = new BookingResponseDto();

		User customer = this.userService.getUserById(booking.getUserId());
		Bike bike = this.bikeService.getBikeById(booking.getBikeId());

		b.setBookingId(booking.getBookingId());
		b.setCustomerContact(customer.getContact());
		b.setCustomerName(customer.getFirstName() + " " + customer.getLastName());
		b.setBookDate(booking.getBookDate());
		b.setBookingDate(booking.getBookingDate());
		b.setBikeId(booking.getBikeId());
		b.setBikeName(bike.getName());
		b.setModelNo(bike.getModelNo());
		b.setRegistrationNo(bike.getRegistrationNo());
		b.setCompany(bike.getCompany());
		b.setId(booking.getId());
		b.setStatus(booking.getStatus());
		b.setUserId(customer.getId());
		b.setServiceFee(booking.getServiceFee());
		b.setServiceStatus(booking.getServiceStatus());
		b.setPaymentMode(booking.getPaymentMode());
		b.setPaymentStatus(booking.getPaymentStatus());

		response.setBookings(Arrays.asList(b));
		response.setSuccess(true);
		response.setResponseMessage("Successfully fetched all the bookings");
		return new ResponseEntity<BookingListResponseDto>(response, HttpStatus.OK);

	}

	@GetMapping("/fetch/status")
	@ApiOperation(value = "Api to fetch all booking status")
	public ResponseEntity<List<String>> fetchAllBookingStatus() {
		LOG.info("Recieved request for fetch all booking status");

		List<String> response = new ArrayList<>();

		for (BookingStatus status : BookingStatus.values()) {
			response.add(status.value());
		}

		return new ResponseEntity<List<String>>(response, HttpStatus.OK);

	}

	@PostMapping("/update/status")
	@ApiOperation(value = "Api to update booking status")
	public ResponseEntity<CommonApiResponse> updateBookingStatus(
			@RequestBody UpdateBookingStatusRequestDto request) {

		LOG.info("Recieved request for updating the booking status");

		CommonApiResponse response = new CommonApiResponse();

		if (request == null) {
			response.setSuccess(true);
			response.setResponseMessage("bad request, request is missing");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		Booking book = this.bookingService.getBookById(request.getBookingId());

		if (BookingStatus.PENDING.value().equals(request.getStatus())) {
			response.setSuccess(true);
			response.setResponseMessage("Can't update Booking status to Pending");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);

		}

		book.setStatus(request.getStatus());
		Booking updatedBooking = this.bookingService.addBooking(book);

		if (updatedBooking != null) {
			response.setSuccess(true);
			response.setResponseMessage("Booking updated successfully");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		} 
		
		else {
			response.setSuccess(true);
			response.setResponseMessage("Failed to update the booking status");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}
	}
	
	@PostMapping("/update/service/status")
	@ApiOperation(value = "Api to update the service status")
	public ResponseEntity<CommonApiResponse> updateServiceStatus(
			@RequestBody UpdateBookingStatusRequestDto request) {

		LOG.info("Recieved request for updating the booking status");

		CommonApiResponse response = new CommonApiResponse();

		if (request == null) {
			response.setSuccess(true);
			response.setResponseMessage("bad request, request is missing");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		Booking book = this.bookingService.getBookById(request.getBookingId());

		if (BookingStatus.PENDING.value().equals(book.getStatus())) {
			response.setSuccess(true);
			response.setResponseMessage("Can't update the service status, booking is not approved!!!");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}
		
		if(request.getPaymentMode().equals(PaymentMode.WALLET.value())) {
			
			User user = this.userService.getUserById(book.getUserId());
			
			if(user.getWalletAmount().compareTo(request.getServiceFee()) < 0) {
				response.setSuccess(true);
				response.setResponseMessage("Insufficient fund in Customer wallet. can't update the service status");
				return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
			}
			
			user.setWalletAmount(user.getWalletAmount().subtract(request.getServiceFee()));
			userService.updateUser(user);
		}

		book.setServiceFee(request.getServiceFee());
		book.setServiceStatus(request.getServiceStatus());
		book.setPaymentMode(request.getPaymentMode());
		book.setPaymentStatus(PaymentStatus.COMPLETED.value());
		
		Booking updatedBooking = this.bookingService.addBooking(book);

		if (updatedBooking != null) {
			response.setSuccess(true);
			response.setResponseMessage("Booking updated successfully");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		} 
		
		else {
			response.setSuccess(true);
			response.setResponseMessage("Failed to update the booking status");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}
	}
	
	@GetMapping("/fetch/service/status")
	@ApiOperation(value = "Api to fetch all service status")
	public ResponseEntity<List<String>> fetchAllServiceStatus() {
		LOG.info("Recieved request for fetch all service status");

		List<String> response = new ArrayList<>();

		for (ServiceStatus status : ServiceStatus.values()) {
			response.add(status.value());
		}

		return new ResponseEntity<List<String>>(response, HttpStatus.OK);

	}
	
	@GetMapping("/fetch/payment/mode")
	@ApiOperation(value = "Api to fetch all payment mode")
	public ResponseEntity<List<String>> fetchAllPaymentMode() {
		LOG.info("Recieved request for fetch all payemnt mode");

		List<String> response = new ArrayList<>();

		for (PaymentMode mode : PaymentMode.values()) {
			response.add(mode.value());
		}

		return new ResponseEntity<List<String>>(response, HttpStatus.OK);

	}

}
