import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const ViewAllBike = () => {
  const [allBike, setAllBike] = useState([]);

  const user = JSON.parse(sessionStorage.getItem("active-customer"));

  useEffect(() => {
    const getAllBike = async () => {
      const allBikes = await retrieveAllBike();
      if (allBikes) {
        setAllBike(allBikes.bikes);
      }
    };

    getAllBike();
  }, []);

  const retrieveAllBike = async () => {
    const response = await axios.get("http://localhost:8080/api/bike/all");
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
          <h2>All Customer Bikes</h2>
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
                  <th scope="col">Bike Name</th>
                  <th scope="col">Company</th>
                  <th scope="col">Model No</th>
                  <th scope="col">Registration Number</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Customer Contact</th>
                </tr>
              </thead>
              <tbody>
                {allBike.map((bike) => {
                  return (
                    <tr>
                      <td>
                        <b>{bike.name}</b>
                      </td>

                      <td>
                        <b>{bike.company}</b>
                      </td>
                      <td>
                        <b>{bike.modelNo}</b>
                      </td>
                      <td>
                        <b>{bike.registrationNo}</b>
                      </td>
                      <td>
                        <b>{bike.customerName}</b>
                      </td>
                      <td>
                        <b>{bike.customerContact}</b>
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

export default ViewAllBike;
