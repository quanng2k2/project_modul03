import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./css/maincart.css";
import axios from "axios";

export default function MainPage() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/v1/rooms");
        setRooms(response.data.rooms);
      } catch (error) {
        console.log(error);
      }
    };
    loadRooms();
  }, []);

  // Hàm format tiền tệ
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <>
      <div className="flex-video-image">
        <video
          id="myVideo"
          src="/images/7635523851700381684.mp4"
          autoplay
          controls
        ></video>
        <img className="image-vietnam" src="/images/image-travel-to.jpg" alt="" />
      </div>
      <div className="container-cart">
        {rooms.map((room) => (
          <div className="card-wrapper" key={room.roomId}>
            <Link to={`/detail/${room.roomId}`}>
              <Card style={{ width: "18rem" }}>
                <div className="image-container">
                  {room.images && room.images[0] && (
                    <img
                      className="img-cart"
                      src={room.images[0].imagePath.trim()}
                      alt=""
                    />
                  )}
                </div>
                <div className="img-overlay">XEM CHI TIẾT</div>
                <Card.Body>
                  <div className="flex-text-cart">
                    <Card.Title>{room.roomName}</Card.Title>
                    <Card.Title>
                      <i className="fa-solid fa-star"></i>
                      4,5
                    </Card.Title>
                  </div>
                  <Card.Text>
                    <p>{room.location}</p>
                    <h6>{formatCurrency(room.price)} / 1 đêm</h6>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
