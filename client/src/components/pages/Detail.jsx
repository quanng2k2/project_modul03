import React, { useEffect, useState } from "react";
import NavbarPage from "../common/user/NavbarPage";
import "./css/detail.css";
import FooterPage from "../common/user/FooterPage";
import Category from "../common/user/Category";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatDate1 } from "../../formatDatas/Formatdata";
import { message } from "antd";

export default function Detail() {
  const { roomId } = useParams();
  const [roomDetail, setRoomDetail] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Lấy thông tin phòng chi tiết khi component được tải
    const loadRoomDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/rooms/${roomId}`
        );
        setRoomDetail(response.data.room);
        console.log(response.data.room);
      } catch (error) {
        console.log(error);
      }
    };

    loadRoomDetail();
  }, [roomId]);

  useEffect(() => {
    // Tính toán tổng giá phòng khi startDate hoặc endDate thay đổi
    if (startDate && endDate) {
      calculateTotalPrice();
    }
  }, [startDate, endDate]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const calculateNumberOfNights = () => {
    // Tính số đêm dựa trên startDate và endDate
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const numberOfNights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return numberOfNights;
  };

  const calculateTotalPrice = () => {
    // Tính toán tổng giá phòng dựa trên số đêm và giá phòng
    const numberOfNights = calculateNumberOfNights();
    const pricePerNight = roomDetail.price;
    const total = numberOfNights * pricePerNight;
    setTotalPrice(total);
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    // Lấy cờ từ localStorage
    const userFlag = JSON.parse(localStorage.getItem("flagUser"));

    // Kiểm tra xem cờ và userId có tồn tại không
    if (!userFlag || !userFlag.userId) {
      message.error(
        "Bạn cần đăng ký hoặc đăng nhập trước khi đặt phòng !!!",
        1
      );
      return;
    }

    if (!startDate || !endDate || !guests) {
      message.error("Thông tin đặt phòng không được để trống ?", 1);
      return;
    }

    // Lấy userId từ cờ
    const userId = userFlag.userId;

    const bookingData = {
      userId: userId,
      roomId: roomDetail.roomId,
      startDate: formatDate1(startDate),
      endDate: formatDate1(endDate),
      guests: guests,
      total_price: totalPrice,
      created_at: formatDate1(new Date()),
    };

    try {
      // Gửi yêu cầu đặt phòng
      const response = await axios.post(
        "http://localhost:3001/api/v1/booking",
        bookingData
      );
      message.success("Đặt phòng thành công <3 ", 1);
      console.log(response.data);

      // Đặt lại giá trị của input về rỗng
      setStartDate("");
      setEndDate("");
      setGuests("");
      setTotalPrice(0);
    } catch (error) {
      console.log(error);
    }
  };

  message.config({
    duration: 2, // Hiển thị thông báo trong vòng 2 giây
  });

  return (
    <>
      <NavbarPage />
      <Category />
      <div className="container-detail">
        {roomDetail ? (
          <div className="header">
            <form className="container-form-flex" onSubmit={handleBooking}>
              <div>
                <label htmlFor="">Nhận phòng :</label>
                <input
                  className="input-details"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="">Trả phòng :</label>
                <input
                  className="input-details"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="">Khách :</label>
                <input
                  className="input-details"
                  type="number"
                  min={1}
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="">Giá : </label>
                <input
                  type="text"
                  style={{ border: "none", fontWeight: "bold" }}
                  value={`${formatCurrency(totalPrice)} / ngày`}
                  disabled
                />
              </div>

              <div>
                <button className="button-booking" type="submit">
                  {" "}
                  Đặt phòng{" "}
                </button>
              </div>
            </form>
            <div className="title-detail-rooms">
              <p> Tên khách sạn : {roomDetail.roomName} .</p>
              <p> Địa chỉ : {roomDetail.location} .</p>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}

        {roomDetail && (
          <div className="container-img-detail">
            <img
              className="img-detail"
              src={roomDetail.images[0].imagePath.trim()}
              alt="loading"
            />
            <div className="grip-img-detail">
              {roomDetail.images.slice(1, 5).map((image, index) => (
                <img
                  className="img-detail-all"
                  src={image.imagePath.trim()}
                  alt="loading"
                  key={index}
                />
              ))}
            </div>
          </div>
        )}

        {roomDetail && (
          <div className="body-detail">
            <div className="detail-hotel">
              <h5>Trên đây là những ảnh nổi bật của khách sạn này.</h5>
              <hr />
              <h2>Giới thiệu về chỗ ở này</h2>
              <p>{roomDetail.descriptions}</p>
              <hr />
              <h2>Nơi này có những gì cho bạn</h2>
              <img src="https://nghecontent.com/wp-content/uploads/2020/11/Vietnam-temporary-travel-policies-against-Covid-19.jpg" alt="Loading...." />
            </div>
          </div>
        )}
      </div>
      <FooterPage />
    </>
  );
}
