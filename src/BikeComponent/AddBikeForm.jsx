import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBikeForm = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-customer"));

  const [bike, setBike] = useState({
    name: "",
    userId: user.id,
    modelNo: "",
    registrationNo: "",
    company: "",
    fault: ""  // new field
  });

  const handleInput = (e) => {
    setBike({ ...bike, [e.target.name]: e.target.value });
  };

  const saveBike = (event) => {
    fetch("http://localhost:8080/api/bike/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bike),
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
            navigate("/user/bike/all");
          }, 1000); // Redirect after 1 second
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
          }, 1000); // Reload after 1 second
        }
      });
    });
    event.preventDefault();
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          className="card form-card border-color custom-bg"
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Add Bike</h5>
          </div>
          <div className="card-body text-color">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  <b>Bike Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={handleInput}
                  value={bike.name}
                />
              </div>

              <div className="mb-3 mt-1">
                <label htmlFor="company" className="form-label">
                  <b>Company</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="company"
                  name="company"
                  onChange={handleInput}
                  value={bike.company}
                />
              </div>

              <div className="mb-3 mt-1">
                <label htmlFor="modelNo" className="form-label">
                  <b>Model Number</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="modelNo"
                  name="modelNo"
                  onChange={handleInput}
                  value={bike.modelNo}
                />
              </div>

              <div className="mb-3 mt-1">
                <label htmlFor="registrationNo" className="form-label">
                  <b>Registration Number</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="registrationNo"
                  name="registrationNo"
                  onChange={handleInput}
                  value={bike.registrationNo}
                />
              </div>

              <div className="mb-3 mt-1">
                <label htmlFor="fault" className="form-label">
                  <b>Fault</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fault"
                  name="fault"
                  onChange={handleInput}
                  value={bike.fault}
                />
              </div>

              <button
                type="submit"
                className="btn bg-color custom-bg-text"
                onClick={saveBike}
              >
                Add Bike
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBikeForm;
