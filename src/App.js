import "./App.css";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./page/AboutUs";
import ContactUs from "./page/ContactUs";
import Header from "./NavbarComponent/Header";
import HomePage from "./page/HomePage";
import UserRegister from "./UserComponent/UserRegister";
import UserLoginForm from "./UserComponent/UserLoginForm";
import ViewAllCustomer from "./UserComponent/ViewAllCusomer";
import ViewMyBooking from "./BookingComponent/ViewMyBooking";
import ViewAllBooking from "./BookingComponent/ViewAllBooking";
import VerifyBooking from "./BookingComponent/VerifyBooking";
import AddBikeForm from "./BikeComponent/AddBikeForm";
import ViewAllBike from "./BikeComponent/ViewAllBike";
import ViewMyBike from "./BikeComponent/ViewMyBike";
import BookService from "./BikeComponent/BookService";
import MyWallet from "./UserComponent/MyWallet";


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/all/hotel/location" element={<HomePage />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="user/hotel/register" element={<UserRegister />} />
        <Route path="user/customer/register" element={<UserRegister />} />
        <Route path="user/admin/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLoginForm />} />
        <Route path="customer/bike/add" element={<AddBikeForm />} />
        <Route path="user/customer/all" element={<ViewAllCustomer />} />
        <Route path="user/ground/bookings" element={<ViewMyBooking />} />
        <Route path="admin/bike/booking/all" element={<ViewAllBooking />} />
        <Route path="admin/bike/all" element={<ViewAllBike />} />
        <Route path="user/bike/all" element={<ViewMyBike />} />
        <Route path="user/bike/booking/service" element={<ViewMyBooking />} />
        <Route
          path="/user/admin/verify/booking/:bookingId"
          element={<VerifyBooking />}
        />
        <Route path="/customer/bike/book/service" element={<BookService />} />
        <Route path="/customer/wallet" element={<MyWallet />} />
      </Routes>
    </div>
  );
}

export default App;
