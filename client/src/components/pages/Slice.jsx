import React from "react";
import "./css/slice.css";
import { NavLink } from "react-router-dom";

export default function Slice() {
  return (
    <div className="container-slice">
      <div className="kodfun-galeri">
        <div className="boxshadow-slice">
          <img src="/images/img01.jpeg" alt="loading..." />
          <div className="text-cart">Atlantic Bearch, Hoa kỳ </div>
        </div>
        <div className="boxshadow-slice">
          <img src="/images/img02.jpeg" alt="loading..." />
          <div className="text-cart">Melrose, Hoa Kỳ </div>
        </div>
        <div className="boxshadow-slice">
          <img src="/images/img03.jpeg" alt="loading..." />
          <div className="text-cart"> Cabo San Lucas, Mexico </div>
        </div>
        <div className="boxshadow-slice">
          <NavLink to="/detail/21" className="nav-link-no-underline">
            <img src="/images/img04.jpeg" alt="loading..." />
            <div className="text-cart">Sơn Trà, Việt Nam</div>
          </NavLink>
        </div>
        <div className="boxshadow-slice">
          <NavLink to="/detail/40" className="nav-link-no-underline">
            <img src="/images/img05.jpg" alt="loading..." />
            <div className="text-cart">TP biển Nha Trang </div>
          </NavLink>
        </div>
      </div>
      <hr className="hr-slice" />
    </div>
  );
}
