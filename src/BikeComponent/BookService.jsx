import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookService = () => {
  const [allBike, setAllBike] = useState([]);

  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-customer"));

  useEffect(() => {
    const getAllBike = async () => {
      const allbike = await retrieveAllBike();
      if (allbike) {
        setAllBike(allbike.bikes);
      }
    };

    getAllBike();
  }, []);

  const retrieveAllBike = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/bike/fetch?userId=" + user.id
    );
    console.log(response.data);
    return response.data;
  };

  const [book, setBook] = useState({
    userId: "",
    bikeId: "",
    bookDate: "",
  });

  book.userId = user.id;

  const handleUserInput = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const saveBooking = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/api/book/bike/service", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
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
            navigate("/user/bike/booking/service");
          }, 3000); // Redirect after 3 seconds
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
      <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div
          className="card form-card border-color text-color custom-bg"
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Book Bike Service</h5>
          </div>
          <div className="card-body">
            <form onSubmit={saveBooking}>
              <div className="mb-3 text-color">
                <label htmlFor="bikeId" className="form-label">
                  <b>Bike</b>
                </label>
                <select
                  onChange={handleUserInput}
                  className="form-control"
                  name="bikeId"
                >
                  <option value="0">Select Bike</option>

                  {allBike.map((bike) => {
                    return <option value={bike.id}> {bike.name} </option>;
                  })}
                </select>
              </div>
              <div className="mb-3 text-color">
                <label htmlFor="bookDate" className="form-label">
                  <b>Booking Date</b>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="bookDate"
                  name="bookDate"
                  onChange={handleUserInput}
                  value={book.bookDate}
                />
              </div>

              <input
                type="submit"
                className="btn bg-color custom-bg-text"
                value="Book"
              />

              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookService;
