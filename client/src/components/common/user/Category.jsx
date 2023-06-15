import React from "react";
import { NavLink } from "react-router-dom";
import "./css/category.css";

export default function Category() {
  return (
    <div className="container-category">
      <NavLink to="/" className="category-link" activeClassName="active">
        <img className="img-category" src="/images/home.jpg" alt="" />
        <p className="title-category">Trang chủ</p>
      </NavLink>

      <NavLink
        to="/category/phong"
        className="category-link"
        activeClassName="active"
      >
        <img className="img-category" src="/images/phòng.jpg" alt="" />
        <p className="title-category">Phòng</p>
      </NavLink>

      <NavLink
        to="/category/nha-nho"
        className="category-link"
        activeClassName="active"
      >
        <img className="img-category" src="/images/nong_trai.jpg" alt="" />
        <p className="title-category">Nhà nhỏ</p>
      </NavLink>

      <NavLink
        to="/category/nha-thuyen"
        className="category-link"
        activeClassName="active"
      >
        <img className="img-category" src="/images/nha_thuyen.jpg" alt="" />
        <p className="title-category">Nhà thuyền</p>
      </NavLink>

      <NavLink
        to="/category/ho-boi-tuyet-voi"
        className="category-link"
        activeClassName="active"
      >
        <img className="img-category" src="/images/ho_boi.jpg" alt="" />
        <p className="title-category">Hồ bơi tuyệt vời</p>
      </NavLink>

      <NavLink
        to="/category/nhiet-doi"
        className="category-link"
        activeClassName="active"
      >
        <img className="img-category" src="/images/sang_tao1.jpg" alt="" />
        <p className="title-category">Nhiệt đới</p>
      </NavLink>

      <NavLink
        to="/category/khung-canh-tuyet-voi"
        className="category-link"
        activeClassName="active"
      >
        <img className="img-category" src="/images/chill.jpg" alt="" />
        <p className="title-category">Khung cảnh tuyệt vời</p>
      </NavLink>

      <NavLink
        to="/category/booking-information"
        className="category-link"
        activeClassName="active"
      >
        <img className="img-category" src="/images/not_tien_ich.jpg" alt="" />
        <p className="title-category">Thông tin đặt phòng</p>
      </NavLink>
    </div>
  );
}
