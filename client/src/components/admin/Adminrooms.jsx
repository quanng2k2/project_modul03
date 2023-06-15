import React, { useEffect, useState } from "react";
import "./css/adminrooms.css";
import Homeadmin from "./Homeadmin";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { formatDate1 } from "../../formatDatas/Formatdata";
import Button from "react-bootstrap/Button";
import { Alert } from "antd";
import Form from "react-bootstrap/Form";

export default function Adminrooms() {
  // alert antd
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Thêm state errors để lưu trạng thái lỗi cho các trường
  const [errors, setErrors] = useState({
    location: "",
    roomName: "",
    descriptions: "",
    price: "",
    images: "",
  });

  // Hàm xử lý thành công alert
  const handleSuccess = () => {
    setShowAlert(true);
    setAlertMessage("Thêm thành công!");
  };

  // Hàm đóng thông báo alert
  const closeAlert = () => {
    setShowAlert(false);
  };

  // map ra table
  const [dataRooms, setDataRooms] = useState([]);
  // khai báo các state cho các trường value input
  const [location, setLocation] = useState("");
  const [roomName, setRoomName] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  // console.log(category);

  const loadDataCategory = () => {
    axios
      .get("http://localhost:3001/api/v1/categories")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadDataCategory();
  }, []);

  const userId = JSON.parse(localStorage.getItem("flagUser"));

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Kiểm tra các trường rỗng
    const newErrors = {};

    if (location.trim() === "") {
      newErrors.location = "Vui lòng nhập vị trí khách sạn";
    }

    if (roomName.trim() === "") {
      newErrors.roomName = "Vui lòng nhập tên khách sạn";
    }

    if (descriptions.trim() === "") {
      newErrors.descriptions = "Vui lòng nhập mô tả khách sạn";
    }

    if (price.trim() === "") {
      newErrors.price = "Vui lòng nhập giá phòng";
    }

    if (images.length < 5) {
      newErrors.images = "Vui lòng chọn ít nhất 5 ảnh";
    }

    setErrors(newErrors);

    // Kiểm tra nếu có lỗi, dừng việc gửi yêu cầu POST
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("location", location);
      formData.append("roomName", roomName);
      formData.append("descriptions", descriptions);
      formData.append("price", price);
      formData.append("userId", userId.userId);
      formData.append("created_at", formatDate1(new Date()));
      formData.append("categoryId", category);

      // chỉ lấy tối đa 5 ảnh
      for (let i = 0; i < Math.min(images.length, 5); i++) {
        formData.append("images", images[i]);
      }

      const response = await axios.post(
        "http://localhost:3001/api/v1/rooms",
        formData,
        {
          "Content-Type": "application/json",
        }
      );

      // Xử lý phản hồi từ API
      setResponseMessage(response.data.message);

      // Sau khi thêm thành công, reset các trường nhập liệu
      setLocation("");
      setRoomName("");
      setDescriptions("");
      setPrice("");
      setImages([]);
      setCategory("");

      // Hiển thị thông báo thành công
      handleSuccess();
      window.location = "/admin-rooms";
    } catch (error) {
      if (error.response) {
        // Xử lý lỗi phản hồi từ API
        setResponseMessage(error.response.data.message);
      } else {
        // Xử lý lỗi kết nối hoặc lỗi không xác định
        setResponseMessage("Lỗi khi thực hiện yêu cầu");
      }
    }
  };

  useEffect(() => {
    const loadDataRooms = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/v1/rooms");
        setDataRooms(response.data.rooms);
      } catch (error) {
        console.log(error);
      }
    };
    loadDataRooms();
  }, []);

  // Hàm format tiền tệ
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  // hàm xóa room theo id
  const handleDelete = async (roomId) => {
    console.log("Deleting room with ID:", roomId);
    // Xác nhận trước khi xóa khách sạn
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa khách sạn này?");

    if (confirmDelete) {
      try {
        // Gửi yêu cầu đến server
        await axios.delete(`http://localhost:3001/api/v1/rooms/${roomId}`);

        // Xóa khỏi danh sách dataRooms
        setDataRooms((prevDataRooms) =>
          prevDataRooms.filter((rooms) => rooms.roomId !== roomId)
        );

        // Hiển thị thông báo xóa thành công
        alert("Xóa khách sạn thành công!");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Homeadmin />
      <div className="container-adminrooms">
        <h1> Quản lý các phòng </h1>
        {/* start search */}
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Tìm kiếm theo tên khách sạn"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        {/* stop search  */}

        {showAlert && (
          <Alert
            message={alertMessage}
            type={responseMessage ? "error" : "success"}
            closable
            onClose={closeAlert}
            className="alert-antd"
          />
        )}
        <form
          id="container-form-admin"
          className="row g-3 needs-validation"
          noValidate=""
          onSubmit={handleSubmit}
        >
          <div className="col-md-4">
            <label htmlFor="validationCustom01" className="form-label">
              Vị trí khách sạn
            </label>
            <input
              placeholder="Mời nhập vị trí khách sạn ..."
              type="text"
              className={`form-control ${errors.location ? "is-invalid" : ""}`}
              id="validationCustom01"
              required=""
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
            {errors.location && (
              <div className="invalid-feedback">{errors.location}</div>
            )}
          </div>

          <div className="col-md-4">
            <label htmlFor="validationCustom02" className="form-label">
              Tên khách sạn
            </label>
            <input
              type="text"
              className={`form-control ${errors.roomName ? "is-invalid" : ""}`}
              id="validationCustom02"
              required=""
              placeholder="Mời nhập vị trí ..."
              value={roomName}
              onChange={(event) => setRoomName(event.target.value)}
            />
            {errors.roomName && (
              <div className="invalid-feedback">{errors.roomName}</div>
            )}
          </div>

          <div className="col-md-4">
            <label htmlFor="validationCustom02" className="form-label">
              Giá đặt phòng / 1 đêm
            </label>
            <input
              type="text"
              className={`form-control ${errors.price ? "is-invalid" : ""}`}
              id="validationCustom02"
              required=""
              placeholder="Giá phòng / 1 đêm ..."
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
            {errors.price && (
              <div className="invalid-feedback">{errors.price}</div>
            )}
          </div>

          <div className="date-of-text">
            <div>
              <label htmlFor="validationCustom05" className="form-label">
                Mô tả khách sạn
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.descriptions ? "is-invalid" : ""
                }`}
                id="validationCustom05"
                required=""
                value={descriptions}
                onChange={(event) => setDescriptions(event.target.value)}
              />
              {errors.descriptions && (
                <div className="invalid-feedback">{errors.descriptions}</div>
              )}
            </div>

            <div>
              <label htmlFor="validationCustom05" className="form-label">
                Loại phòng
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-control"
                style={{ width: 330 }}
              >
                <option value="" disabled selected>
                  Chọn loại phòng
                </option>
                {categories.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="validationCustom05" className="form-label">
                Ảnh khách sạn
              </label>
              <input
                type="file"
                className={`form-control ${errors.images ? "is-invalid" : ""}`}
                id="validationCustom05"
                required=""
                onChange={(event) => setImages(event.target.files)}
                multiple
                placeholder="Bắt buộc phải có 5 ảnh"
              />
              {errors.images && (
                <div className="invalid-feedback">{errors.images}</div>
              )}
            </div>
          </div>

          <div className="col-12">
            <button className="btn btn-primary" type="submit">
              Thêm phòng
            </button>
          </div>
        </form>

        {/* table admin */}
        <Table striped bordered hover size="sm" id="table-admin-rooms">
          <thead id="content-adminrooms">
            <tr>
              <th>STT</th>
              <th>Ảnh khách sạn</th>
              <th>Tên khách sạn</th>
              <th>Vị trí khách sạn</th>
              <th>Giá phòng / 1 đêm</th>
              <th colSpan={2}>Chỉnh sửa</th>
            </tr>
          </thead>
          <tbody>
            {dataRooms.map((room, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>
                  {room.images && room.images[0] && (
                    <img
                      className="img-admin"
                      src={room.images[0].imagePath.trim()}
                      alt=""
                    />
                  )}
                </td>
                <td>{room.roomName}</td>
                <td>{room.location}</td>
                <td>{formatCurrency(room.price)}</td>
                <td>
                  <Button variant="warning">Sửa</Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(room.roomId)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
