import React, { useState, useEffect, useRef } from 'react';
import Carousel from "./Carousel";
import { Link } from "react-router-dom";
import bike_repair from "../images/bike_repair.png";
import repair_mechanic from "../images/repair_mechanic.png";
import Footer from "./Footer";
import Counter from "./Counter"; // Import the Counter component

const HomePage = () => {
  const firstNameRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Retrieve the visit count from local storage or default to 0
    const storedCount = parseInt(localStorage.getItem('visitCount'), 10) || 0;
    setCount(storedCount);

    // Focus on the first name input field if it exists
    if (firstNameRef.current) {
      firstNameRef.current.focus();
    }
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem('visitCount', newCount);
  };

  return (
    <div className="container-fluid mb-2">
      <Carousel />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            <h1 className="text-color">Welcome to Bike Service Management</h1>
            <p>
              The Bike Servicing Management System is an innovative project
              aimed at streamlining and enhancing the efficiency of bike
              maintenance services. This system automates the process of
              scheduling, tracking, and managing bike repairs, ensuring timely
              servicing and improved customer satisfaction. By integrating
              technology into the maintenance process, it simplifies operations
              and reduces manual effort.
            </p>
            <p>
              With our system, administrators can efficiently manage employee
              records, assign roles and permissions, generate reports, and
              oversee the overall employee management workflow. Employees can
              access their profiles, view their schedules, request leave, and
              communicate with their managers. Managers can easily track
              employee performance, approve requests, and ensure smooth
              operations within their teams.
            </p>
            <Link to="/user/login" className="btn bg-color custom-bg-text">
              Get Started
            </Link>
          </div>
          <div className="col-md-4">
            <img
              src={bike_repair}
              alt="Logo"
              width="450"
              height="auto"
              className="home-image"
            />
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-4">
            <img
              src={repair_mechanic}
              alt="Logo"
              width="400"
              height="auto"
              className="home-image"
            />
          </div>
          <div className="col-md-8">
            <h1 className="text-color ms-5">
              Quality Service and Genuine Parts
            </h1>
            <p className="ms-5">
              We are committed to delivering the best service possible to our
              customers. Our Bike Servicing Shop uses only genuine and
              high-quality parts for all repairs and replacements. This
              dedication to quality ensures the longevity and reliability of
              your bike, giving you peace of mind and enhancing your overall
              cycling experience. With us, your bike is treated with care and
              attention to detail, so you can ride with confidence.
            </p>
            <p className="ms-5">
              At our Bike Servicing Shop, we take pride in having a team of
              highly skilled and experienced technicians. With a deep
              understanding of various bike makes and models, our experts
              provide top-notch servicing, repairs, and maintenance.
            </p>
            <Link to="/user/login" className="btn bg-color custom-bg-text ms-5">
              Get Started
            </Link>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-12">
            <form className="registration-form" onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="firstName">First Name:</label>
                
                <input type="text" id="firstName"  autoFocus="autofocus"ref={firstNameRef} />
              </div>
              <div>
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" />
              </div>
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
      <hr />
      <Footer />
      <Counter /> {/* Add the Counter component here */}
    </div>
  );
};

export default HomePage;
