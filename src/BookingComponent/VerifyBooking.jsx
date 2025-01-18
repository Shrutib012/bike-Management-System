import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const VerifyBooking = () => {
  const [booking, setBooking] = useState([]);

  const { bookingId } = useParams();
  const [bookingStatus, setBookingStatus] = useState([]);

  const [serviceStatuses, setServiceStatuses] = useState([]);
  const [paymentModes, setPaymentModes] = useState([]);

  const [updateBookingStatus, setUpdateBookingStatus] = useState({
    bookingId: "",
    status: "",
  });

  const [updateServiceStatus, setUpdateServiceStatus] = useState({
    bookingId: "",
    status: "",
    serviceStatus: "",
    paymentMode: "",
    serviceFee: "",
  });

  const handleServiceInput = (e) => {
    setUpdateServiceStatus({
      ...updateServiceStatus,
      [e.target.name]: e.target.value,
    });
  };

  updateBookingStatus.bookingId = bookingId;
  updateServiceStatus.bookingId = bookingId;

  const retrieveAllBookingStatus = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/book/bike/fetch/status"
    );
    return response.data;
  };

  const retrieveAllServiceStatus = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/book/bike/fetch/service/status"
    );
    return response.data;
  };

  const retrieveAllPaymentMode = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/book/bike/fetch/payment/mode"
    );
    return response.data;
  };

  useEffect(() => {
    const getBooking = async () => {
      const b = await retrieveBooking();
      if (b) {
        setBooking(b.bookings[0]);
      }
    };

    const getAllBookingStatus = async () => {
      const allBookingStatus = await retrieveAllBookingStatus();
      if (allBookingStatus) {
        setBookingStatus(allBookingStatus);
      }
    };

    const getAllServiceStatus = async () => {
      const allBookingStatus = await retrieveAllServiceStatus();
      if (allBookingStatus) {
        setServiceStatuses(allBookingStatus);
      }
    };

    const getAllPaymentMode = async () => {
      const paymentModes = await retrieveAllPaymentMode();
      if (paymentModes) {
        setPaymentModes(paymentModes);
      }
    };

    getAllBookingStatus();
    getAllServiceStatus();
    getAllPaymentMode();
    getBooking();
  }, []);

  const retrieveBooking = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/book/bike/fetch/bookingId?id=" + bookingId
    );
    console.log(response.data);
    return response.data;
  };

  const handleBookingInput = (e) => {
    setUpdateBookingStatus({
      ...updateBookingStatus,
      [e.target.name]: e.target.value,
    });
  };

  let navigate = useNavigate();

  const updateBikeBookingStatus = (e) => {
    e.preventDefault();

    console.log(updateBookingStatus);

    fetch("http://localhost:8080/api/book/bike/update/status", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateBookingStatus),
    }).then((result) => {
      console.log("result", result);
      result.json().then((res) => {
        console.log(res);

        if (res.success) {
          console.log("Got the success response");

          toast.success(res.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/admin/bike/booking/all");
          }, 2000); // Redirect after 3 seconds
        } else {
          console.log("Didn't got success response");
          toast.error("It seems server is down", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.reload(true);
          }, 1000); // Redirect after 3 seconds
        }
      });
    });
  };

  const updatebikeServiceStatus = (e) => {
    e.preventDefault();

    console.log(updateServiceStatus);

    fetch("http://localhost:8080/api/book/bike/update/service/status", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateServiceStatus),
    }).then((result) => {
      console.log("result", result);
      result.json().then((res) => {
        console.log(res);

        if (res.success) {
          console.log("Got the success response");

          toast.success(res.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/admin/bike/booking/all");
          }, 2000); // Redirect after 3 seconds
        } else {
          console.log("Didn't got success response");
          toast.error("It seems server is down", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.reload(true);
          }, 1000); // Redirect after 3 seconds
        }
      });
    });
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          className="card form-card border-color custom-bg"
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Booking Status</h5>
          </div>
          <div className="card-body text-color">
            <div className="mb-3 mt-1">
              <label htmlFor="quantity" className="form-label">
                <b>Booking Id</b>
              </label>
              <input
                type="text"
                className="form-control"
                value={booking.bookingId}
                required
                readOnly
              />
            </div>

            <div className="mb-3 mt-1">
              <form>
                <div class="col">
                  <label htmlFor="quantity" className="form-label">
                    <b>Booking Status</b>
                  </label>
                  <select
                    name="status"
                    onChange={handleBookingInput}
                    className="form-control"
                    required
                  >
                    <option value="">Status</option>

                    {bookingStatus.map((status) => {
                      return <option value={status}> {status} </option>;
                    })}
                  </select>
                </div>

                <div class="col">
                  <button
                    type="submit"
                    class="btn bg-color btn-sm custom-bg-text mt-4"
                    onClick={updateBikeBookingStatus}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          className="card form-card border-color custom-bg ms-5"
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Service Status</h5>
          </div>
          <div className="card-body text-color">
            <div className="mb-3 mt-1">
              <label htmlFor="quantity" className="form-label">
                <b>Booking Id</b>
              </label>
              <input
                type="text"
                className="form-control"
                value={booking.bookingId}
                required
                readOnly
              />
            </div>

            <div className="mb-3 mt-1">
              <form>
                <div class="col">
                  <label htmlFor="quantity" className="form-label">
                    <b>Service Status</b>
                  </label>
                  <select
                    name="serviceStatus"
                    onChange={handleServiceInput}
                    className="form-control"
                    required
                  >
                    <option value="">Status</option>

                    {serviceStatuses.map((status) => {
                      return <option value={status}> {status} </option>;
                    })}
                  </select>
                </div>

                <div class="col mt-2">
                  <label htmlFor="quantity" className="form-label">
                    <b>Payment Mode</b>
                  </label>
                  <select
                    name="paymentMode"
                    onChange={handleServiceInput}
                    className="form-control"
                    required
                  >
                    <option value="">Status</option>

                    {paymentModes.map((mode) => {
                      return <option value={mode}> {mode} </option>;
                    })}
                  </select>
                </div>

                <div className="mb-3 mt-2">
                  <label htmlFor="quantity" className="form-label">
                    <b>Service Fee</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="serviceFee"
                    onChange={handleServiceInput}
                    value={updateServiceStatus.serviceFee}
                  />
                </div>

                <div class="col">
                  <button
                    type="submit"
                    class="btn bg-color btn-sm custom-bg-text mt-4"
                    onClick={updatebikeServiceStatus}
                  >
                    Update Service Status
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyBooking;
