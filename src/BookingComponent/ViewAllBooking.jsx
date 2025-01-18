import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const ViewAllBooking = () => {
  const [allBookings, setAllBookings] = useState([]);

  let user = JSON.parse(sessionStorage.getItem("active-customer"));

  useEffect(() => {
    const getAllBooking = async () => {
      const allBooking = await retrieveAllBooking();
      if (allBooking) {
        setAllBookings(allBooking.bookings);
      }
    };

    getAllBooking();
  }, []);

  const retrieveAllBooking = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/book/bike/fetch/all"
    );
    console.log(response.data);
    return response.data;
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg border-color "
        style={{
          height: "45rem",
        }}
      >
        <div className="card-header custom-bg-text text-center bg-color">
          <h2>All Bookings</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Booking Id</th>
                  <th scope="col">Bike Name</th>
                  <th scope="col">Company</th>
                  <th scope="col">Model No</th>
                  <th scope="col">Registration Number</th>
                  <th scope="col">Customer Number</th>
                  <th scope="col">Customer Contact</th>
                  <th scope="col">Booking Date</th>
                  <th scope="col">Booked Date</th>
                  <th scope="col">Booking Status</th>
                  <th scope="col">Servicing Status</th>
                  <th scope="col">Servicing Fee</th>
                  <th scope="col">Payment Mode</th>
                  <th scope="col">Payment Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allBookings.map((booking) => {
                  return (
                    <tr>
                      <td>
                        <b>{booking.bookingId}</b>
                      </td>
                      <td>
                        <b>{booking.bikeName}</b>
                      </td>
                      <td>
                        <b>{booking.company}</b>
                      </td>
                      <td>
                        <b>{booking.modelNo}</b>
                      </td>

                      <td>
                        <b>{booking.registrationNo}</b>
                      </td>
                      <td>
                        <b>{booking.customerName}</b>
                      </td>
                      <td>
                        <b>{booking.customerContact}</b>
                      </td>

                      <td>
                        <b>{booking.bookingDate}</b>
                      </td>

                      <td>
                        <b>{booking.bookDate}</b>
                      </td>

                      <td>
                        <b>{booking.status}</b>
                      </td>
                      <td>
                        <b>{booking.serviceStatus}</b>
                      </td>
                      <td>
                        <b>{booking.serviceFee}</b>
                      </td>
                      <td>
                        <b>{booking.paymentMode}</b>
                      </td>
                      <td>
                        <b>{booking.paymentStatus}</b>
                      </td>

                      <td>
                        {(() => {
                          if (booking.serviceStatus !== "Completed") {
                            if (booking.status !== "Cancel") {
                              return (
                                <Link
                                  to={`/user/admin/verify/booking/${booking.id}`}
                                  className="nav-link active btn btn-sm"
                                  aria-current="page"
                                >
                                  <b className="text-color">Verify Booking</b>
                                </Link>
                              );
                            }
                          }
                        })()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllBooking;
