import "./App.css";
import HomePage from "./components/pages/HomePage";
import { Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login";
import Detail from "./components/pages/Detail";
import Signup from "./components/pages/Signup";
import Phong from "./components/pages/Phong";
import Nhathuyen from "./components/pages/Nhathuyen";
import Hoboi from "./components/pages/Hoboi";
import Canhchill from "./components/pages/Canhchill";
import Homeadmin from "./components/admin/Homeadmin";
import Adminrooms from "./components/admin/Adminrooms";
import Admintrips from "./components/admin/Admintrips";
import Adminusers from "./components/admin/Adminusers";
import Nhanho from "./components/pages/Nhanho";
import Nhietdoi from "./components/pages/Nhietdoi";
import Bookinginformation from "./components/pages/Bookinginformation";
import Homepageadmin from "./components/admin/Homepageadmin";
import Adminrevenue from "./components/admin/Adminrevenue";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/admin" element={<Homeadmin />}></Route>
        <Route path="/category/phong" element={<Phong />}></Route>
        <Route path="/detail/:roomId" element={<Detail />}></Route>
        <Route path="/category/nhiet-doi" element={<Nhietdoi />}></Route>
        <Route
          path="/category/booking-information"
          element={<Bookinginformation />}
        ></Route>
        <Route path="/category/nha-thuyen" element={<Nhathuyen />}></Route>
        <Route path="/category/ho-boi-tuyet-voi" element={<Hoboi />}></Route>
        <Route
          path="/category/khung-canh-tuyet-voi"
          element={<Canhchill />}
        ></Route>
        <Route path="/category/nha-nho" element={<Nhanho />}></Route>
        {/* admin */}
        <Route path="/admin-home" element={<Homepageadmin />}></Route>
        <Route path="/admin-rooms" element={<Adminrooms />}></Route>
        <Route path="/admin-rooms" element={<Adminrooms />}></Route>
        <Route path="/admin-trips" element={<Admintrips />}></Route>
        <Route path="/admin-users" element={<Adminusers />}></Route>
        <Route path="/admin-revenue" element={<Adminrevenue />}></Route>
      </Routes>
    </div>
  );
}

export default App;
