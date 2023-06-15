import React, { useEffect, useState } from "react";
import Homeadmin from "./Homeadmin";
import "./css/admintrips.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { formatDate } from "../../formatDatas/Formatdata";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Admintrips() {
  const [searchResult, setSearchResult] = useState([]);
  const [dataBooking, setDataBooking] = useState([]);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/booking"
        );
        setDataBooking(response.data.bookings);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    loadBookings();
  }, []);

  const handleSearch = (event) => {
    const keyword = event.target.value.toLowerCase();
    const filteredData = dataBooking.filter(
      (booking) =>
        booking.email.toLowerCase().includes(keyword) ||
        booking.roomName.toLowerCase().includes(keyword) ||
        booking.location.toLowerCase().includes(keyword)
    );
    setSearchResult(filteredData);
  };

  const bookings = searchResult.length > 0 ? searchResult : dataBooking;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  // Sắp xếp các đặt phòng theo email
  bookings.sort((a, b) => a.email.localeCompare(b.email));

  return (
    <>
      <Homeadmin />
      <div className="container-admintrips">
        <h1>Thông tin chuyến đi</h1>

        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={handleSearch}
          />
          <Button variant="outline-success">Search</Button>
        </Form>

        <Table striped bordered hover size="sm">
          <thead id="table-content-rooms">
            <tr>
              <th>STT</th>
              <th>Email người booking</th>
              <th>Tên khách sạn</th>
              <th>Vị trí chuyến đi</th>
              <th>Ngày khởi hành</th>
              <th>Ngày kết thúc</th>
              <th>Số người</th>
              <th>Tổng chi phí</th>
            </tr>
          </thead>
          <tbody id="table-trips-booking">
            {bookings.map((adminBook, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{adminBook.email}</td>
                <td>{adminBook.roomName}</td>
                <td>{adminBook.location}</td>
                <td>{formatDate(adminBook.startDate)}</td>
                <td>{formatDate(adminBook.endDate)}</td>
                <td>{adminBook.guests}</td>
                <td>{formatCurrency(adminBook.total_price)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
