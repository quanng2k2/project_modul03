import React, { useEffect, useState } from "react";
import NavbarPage from "../common/user/NavbarPage";
import Category from "../common/user/Category";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import FooterPage from "../common/user/FooterPage";

export default function Canhchill() {
  const [categoryRooms, setCategoryRooms] = useState([]);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/categories/5"
        );
        setCategoryRooms(response.data.rooms);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    loadCategory();
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
      <NavbarPage />
      <Category />
      <div className="container-rooms">
        <h1>Đặt phòng với những khách sạn có hồ bơi đẹp </h1>
      </div>
      <div className="container-cart">
        {categoryRooms.map((room) => (
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
                <div className="img-overlay">Xem chi tiết</div>
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
      <FooterPage />
    </>
  );
}
