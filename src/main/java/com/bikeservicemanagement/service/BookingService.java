package com.bikeservicemanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bikeservicemanagement.dao.BookingDao;
import com.bikeservicemanagement.entity.Booking;

@Service
public class BookingService {

	@Autowired
	private BookingDao bookingDao;
	
	public Booking addBooking(Booking booking) {
		return bookingDao.save(booking);
	}
	
	public Booking getBookById(int id) {
		return bookingDao.findById(id).get();
	}
	
	public List<Booking> getAllBooking() {
		return bookingDao.findAll();
	}
	
	public Booking getBookingByBookingId(String bookingId) {
		return bookingDao.findByBookingId(bookingId);
	}
	 
	public List<Booking> getBookingsByUserId(int userId) {
		return bookingDao.findByUserId(userId);
	}
	
}
