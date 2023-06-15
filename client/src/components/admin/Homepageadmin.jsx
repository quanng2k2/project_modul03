import React from "react";
import Homeadmin from "./Homeadmin";
import "./css/homepageadmin.css";

export default function Homepageadmin() {
  return (
    <>
      <Homeadmin />
      <div className="container-homepageadmin">
        <h3>Hello admin 🤢 🤢 🤢 </h3>
        <div className="nhạc-chilladmin">
          <video
            id="chillday"
            src="/images/1818769579591570605.mp4"
            controls
            autoPlay
          ></video>
        </div>
      </div>
    </>
  );
}
