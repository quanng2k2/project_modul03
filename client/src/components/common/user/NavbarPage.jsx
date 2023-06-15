import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal"; // Import the Modal component
import "./css/navbar.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BasicExample() {
  const navigate = useNavigate();
  const userLocal = localStorage.getItem("flagUser");
  console.log(userLocal);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [showSecondModal, setShowSecondModal] = useState(false); // New state for the second modal
  const [userData, setUserData] = useState({}); // State để lưu trữ dữ liệu người dùng

  const openModal = () => {
    setShowModal(!showModal);
  };

  const openSecondModal = () => {
    setShowSecondModal(true);
  };

  const closeSecondModal = () => {
    setShowSecondModal(false);
  };

  useEffect(() => {
    const checkbox = document.querySelector(".checkbox");
    const body = document.querySelector("body");

    const handleClick = (event) => {
      if (checkbox.classList.contains("on")) {
        checkbox.setAttribute("aria-checked", "false");
        body.style.backgroundColor = "#f0f0f0";
      } else {
        checkbox.setAttribute("aria-checked", "true");
        body.style.backgroundColor = "#272525";
      }
      checkbox.classList.toggle("on");
    };

    checkbox.addEventListener("click", handleClick);

    return () => {
      checkbox.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (userLocal) {
      setModalContent("Tài khoản và Đăng xuất");
      const user = JSON.parse(userLocal);
      setUserData(user);
    } else {
      setModalContent("Đăng ký và Đăng nhập");
      setUserData({});
    }
  }, [userLocal]);

  const handleLogout = () => {
    localStorage.removeItem("flagUser");
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="container-navbar">
      <Navbar
        style={{
          backgroundColor: "rgba(225, 165, 0, 0.9)",
        }}
        expand="lg"
      >
        <Container>
          <div className="flex-img-title">
            <i className="imageLogo fa-brands fa-slack"></i>
            <Navbar.Brand className="title-page">
              <Nav className="me-auto">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    <h4 className="title-navbar"> Airbnb </h4>
                  </Link>
                </li>
              </Nav>
            </Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
            {/* search cart */}
            <Form id="search-navbar" className="d-flex">
              <Form.Control
                type="search"
                placeholder="Hôm nay bạn muốn tìm ?"
                className="me-2"
                aria-label="Search"
              />
              <Button className="search-nav-bar" variant="dark">
                Tìm kiếm
              </Button>
            </Form>
            {/* stop cart */}
            <div className="button-login-signup">
              <button className="boder-bars" onClick={openModal}>
                <i className="fa-solid fa-bars"></i>
              </button>
              <div>
                <i className="fa-sharp fa-regular fa-user"></i>
              </div>
            </div>
            <button
              className="checkbox"
              role="switch"
              aria-checked="false"
            ></button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {showModal ? (
        <>
          <div className="dropdown">
            <Nav className="dropdown-list">
              <div className="icon-user">
                <div className="hover-color">
                  {/* <button className="dropdown-item" onClick={openSecondModal}>
                    {modalContent.includes("Đăng ký") ? "Đăng ký" : "Tài khoản"}
                  </button> */}

                  <Link
                    to={userLocal ? "#" : "/signup"}
                    className="dropdown-item"
                    onClick={openSecondModal}
                  >
                    {modalContent.includes("Đăng ký") ? "Đăng ký" : "Tài khoản"}
                  </Link>
                </div>
                <div>
                  <i className="fa-solid fa-user-plus"></i>
                </div>
              </div>
              <div className="icon-user">
                <div className="hover-color">
                  <Link
                    to="/login"
                    className="dropdown-item"
                    onClick={handleLogout}
                  >
                    {modalContent.includes("Đăng nhập")
                      ? "Đăng nhập"
                      : "Đăng xuất"}
                  </Link>
                </div>
                <div>
                  <i className="fa-solid fa-right-to-bracket"></i>
                </div>
              </div>
            </Nav>
          </div>
        </>
      ) : (
        <></>
      )}

      {/* Second Modal Component */}
      <Modal
        className="modal-user"
        show={showSecondModal}
        onHide={closeSecondModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tài khoản của tôi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Họ tên : {userData.username}</p>
          <p>Email : {userData.email}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeSecondModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BasicExample;
