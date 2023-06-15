import React from "react";
import { NavLink } from "react-router-dom";
import "./css/homeadmin.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function Homeadmin() {
  const navigate = useNavigate();
  const flagAdmin = localStorage.getItem("flagUser");

  const hendleLogOut = () => {
    // Xóa cờ khỏi localStorage
    localStorage.removeItem("flagUser");
    // Điều hướng đến trang đăng nhập
    navigate("/login");
  };

  return (
    <div>
      <div className="wrapper">
        {/* Top menu */}
        <div className="sidebar">
          {/* Profile image & text */}
          <div className="profile">
            <img src="/images/img-admin.jpg" alt="profile_picture" />
            <h3>Nguyễn Gia Quân</h3>
            <p>Local boy</p>
          </div>

          {/* Menu items */}
          <>
            <ul>
              <li>
                <NavLink exact to="/admin-home" activeClassName="active">
                  Trang chủ
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin-rooms">Quản lý các phòng</NavLink>
              </li>
              <li>
                <NavLink to="/admin-trips">Quản lý chuyến đi</NavLink>
              </li>
              <li>
                <NavLink to="/admin-users">Quản lý user</NavLink>
              </li>
              <li>
                <NavLink to="/admin-revenue">Doanh thu</NavLink>
              </li>
              <li>
                <Button variant="outline-light" onClick={hendleLogOut}>
                  Đăng xuất
                </Button>
              </li>
            </ul>
          </>
        </div>
      </div>
    </div>
  );
}
