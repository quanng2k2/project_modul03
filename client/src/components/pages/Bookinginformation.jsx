import React, { useEffect, useState } from "react";
import NavbarPage from "../common/user/NavbarPage";
import Category from "../common/user/Category";
import FooterPage from "../common/user/FooterPage";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { formatDate } from "../../formatDatas/Formatdata";
import Button from "react-bootstrap/Button";
import "./css/booking.css";
import { message } from "antd";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

export default function Bookinginformation() {
  // confirm pay card
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  // states vaidate pay card
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});

  //modal pay
  const [scrollableModal, setScrollableModal] = useState(false);

  // State lưu trữ userId của người dùng
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userFlag = JSON.parse(localStorage.getItem("flagUser"));
    if (userFlag) {
      const userId = userFlag.userId;
      setUserId(userId); // Cập nhật state userId khi đăng nhập
    }
  }, []);

  const [dataBooking, setDataBooking] = useState([]);
  const loadBooking = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/booking/${userId}`
      );
      setDataBooking(response.data.bookings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      loadBooking();
    }
  }, [userId]);

  // Hàm format tiền tệ
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handleCancelBooking = async (bookingId) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn hủy lịch ở khách sạn này không?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:3001/api/v1/booking/${userId}/${bookingId}`
        );
        // Reload the bookings after successful deletion
        loadBooking();
      } catch (error) {
        console.log(error);
        alert("Hủy phòng thất bại !!!");
      }
    }
  };

  const handleSuccess = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      setPaymentSuccess(true);
      setIsPaid(true);
      localStorage.setItem("paymentMessage", "Đã thanh toán");
      loadBooking();
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!cardName.trim()) {
      errors.cardName = "Tên chủ thẻ không được bỏ trống";
    }

    if (!cardNumber.trim()) {
      errors.cardNumber = "Số thẻ không được bỏ trống";
    }

    if (!expirationDate.trim()) {
      errors.expirationDate = "Ngày hết hạn không được bỏ trống";
    }

    if (!cvv.trim()) {
      errors.cvv = "CVV không được bỏ trống";
    } else if (!/^\d{3}$/.test(cvv)) {
      errors.cvv = "CVV không hợp lệ";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  message.config({
    duration: 2, // Hiển thị thông báo trong vòng 2 giây
  });

  return (
    <>
      <NavbarPage />
      <Category />
      <div className="container-rooms-booking">
        <h1>Thông tin đặt phòng của tôi</h1>
        <Table striped>
          <thead id="content-book">
            <tr>
              <th>STT</th>
              <th>Tên khách sạn</th>
              <th>Địa chỉ khách sạn</th>
              <th>Ngày đặt phòng</th>
              <th>Ngày trả phòng</th>
              <th>Giá tiền</th>
              <th>Số người </th>
              <th>Hủy lịch </th>
            </tr>
          </thead>
          <tbody id="body-book">
            {dataBooking.map((book, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{book.roomName}</td>
                <td>{book.location}</td>
                <td>{formatDate(book.startDate)}</td>
                <td>{formatDate(book.endDate)}</td>
                <td>{formatCurrency(book.total_price)}</td>
                <td>{book.guests}</td>
                <td>
                  {isPaid ? (
                    "Đã thanh toán"
                  ) : (
                    <Button
                      variant="danger"
                      onClick={() => handleCancelBooking(book.bookingId)}
                    >
                      Hủy phòng
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button
          variant="dark"
          className="pay-cart"
          onClick={() => setScrollableModal(!scrollableModal)}
        >
          Phương thức thanh toán
        </Button>
      </div>
      <FooterPage />
      <MDBModal
        show={scrollableModal}
        setShow={setScrollableModal}
        tabIndex="-1"
        id="modal-pay"
      >
        <MDBModalDialog scrollable>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Phương thức thanh toán </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setScrollableModal(!scrollableModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="container-pay-cart">
                <div className="pay-header">
                  <p>Các loại thẻ</p>
                  <i class="fa-brands fa-paypal"></i>
                  <i class="fa-brands fa-cc-paypal"></i>
                  <i class="fa-solid fa-money-check-dollar"></i>
                </div>
                <form className="mt-4">
                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="typeName"
                      className={`form-control form-control-lg ${
                        errors.cardName ? "is-invalid" : ""
                      }`}
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      size={17}
                      placeholder="Họ Và Tên Chủ Thẻ"
                    />
                    <label className="form-label" htmlFor="typeName">
                      Tên chủ thẻ
                    </label>
                  </div>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="typeText"
                      className={`form-control form-control-lg ${
                        errors.cardNumber ? "is-invalid" : ""
                      }`}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      size={17}
                      placeholder="1234 5678 9012 3457"
                      minLength={19}
                      maxLength={19}
                    />
                    <label className="form-label" htmlFor="typeText">
                      Số thẻ
                    </label>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="form-outline form-white">
                        <input
                          type="text"
                          id="typeExp"
                          className={`form-control form-control-lg ${
                            errors.expirationDate ? "is-invalid" : ""
                          }`}
                          value={expirationDate}
                          onChange={(e) => setExpirationDate(e.target.value)}
                          placeholder="MM/YYYY"
                          size={7}
                          minLength={7}
                          maxLength={7}
                        />
                        <label className="form-label" htmlFor="typeExp">
                          Hết hạn
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-outline form-white">
                        <input
                          type="password"
                          id="typeText"
                          className={`form-control form-control-lg ${
                            errors.cvv ? "is-invalid" : ""
                          }`}
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          placeholder="●●●"
                          size={1}
                          minLength={3}
                          maxLength={3}
                        />
                        <label className="form-label" htmlFor="typeText">
                          Cvv
                        </label>
                      </div>
                    </div>
                    {errors.cardName && (
                      <div className="invalid-feedback">{errors.cardName}</div>
                    )}
                    {/* Repeat the same for other fields (cardNumber, expirationDate, cvv) */}
                  </div>
                  <div className="pay-total">
                    <Button
                      variant="warning"
                      onClick={() => setScrollableModal(!setScrollableModal)}
                    >
                      Thanh toán khi nhận phòng
                    </Button>
                    <Button variant="danger" onClick={handleSuccess}>
                      Thanh toán bây giờ
                    </Button>
                  </div>
                </form>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => setScrollableModal(!setScrollableModal)}
              >
                Quay lại
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
