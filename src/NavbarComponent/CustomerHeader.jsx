import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerHeader = () => {
  let navigate = useNavigate();

  const userLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-customer");
    sessionStorage.removeItem("customer-jwtToken");

    setTimeout(() => {
      window.location.reload(true);
      navigate("/home");
    }, 3000);
  };

  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li className="nav-item">
        <Link
          to="/customer/wallet"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">My Wallet</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="customer/bike/add"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Add Bike</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="user/bike/all"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">My Bikes</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/customer/bike/book/service"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Book Service</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="user/bike/booking/service"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Booked Services</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={userLogout}
        >
          <b className="text-color">Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default CustomerHeader;
