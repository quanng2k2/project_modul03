// import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./css/signup.css";
import { useEffect, useState } from "react";
import axios from "axios";
import validator from "validator";
import { formatDate1 } from "../../formatDatas/Formatdata";
import { message } from "antd";

export default function Signup() {
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registeredEmails, setRegisteredEmails] = useState([]);
  const [success, setSuccess] = useState(false);

  const togglePasswordVisibility = () => {
    setTogglePassword(!togglePassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setToggleConfirmPassword(!toggleConfirmPassword);
  };

  const fetchRegisteredEmails = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/users");
      const users = response.data;
      const emails = users.map((user) => user.email);
      setRegisteredEmails(emails);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRegisteredEmails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (registeredEmails.includes(email)) {
      message.error(
        "Email đã được đăng ký trước đó. Vui lòng sử dụng email khác.",
        1
      );
      return;
    }

    // Kiểm tra các trường nhập liệu
    if (!email || !username || !password || !confirmPassword) {
      message.error("Vui lòng điền đầy đủ thông tin !!!", 1);
      return;
    }

    if (!validator.isEmail(email)) {
      message.error("Email của bạn không đúng định dạng!", 1);
      return;
    }

    if (password.length < 5) {
      message.error("Mật khẩu của bạn phải hơn 5 ký tự !!!", 1);
      return;
    }

    if (password !== confirmPassword) {
      message.error("Mật khẩu không khớp !!!!", 1);
      return;
    }

    // thực hiện đăng ký mới
    const newUser = {
      email: email,
      username: username,
      passwords: password,
      created_at: formatDate1(new Date()),
      roles: "user",
    };

    try {
      await axios.post("http://localhost:3001/api/v1/users", newUser);
      // Đặt lại các trường input sau khi gửi thành công
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setRegisteredEmails([...registeredEmails, email]);
      setSuccess(true);
      message.success("Đăng ký thành công ", 1);
    } catch (error) {
      console.log(error);
      message.error(
        "Đăng ký thất bại hoặc đã tồn tại email này vui lòng thử lại !!!",
        1
      );
    }
  };
  if (success) {
    return <Navigate to="/login" />;
  }

  message.config({
    duration: 2, // Hiển thị thông báo trong vòng 2 giây
  });

  return (
    <>
      <div className="background-body">
        <h4 className="title">
          Xin chào ,hãy đăng ký Aribnb ngay Aribnb giúp bạn <br />
          đặt phòng online nhanh chóng, dễ dàng, tiện lợi .
        </h4>
        <div className="container-signup">
          <div className="item-img">
            <img src="/images/background-login.jpg" alt="" />
          </div>
          <div className="item-form">
            <form onSubmit={handleSubmit}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-form"
                type="text"
                placeholder="Nhập email ở đây..."
              />

              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-form"
                type="text"
                placeholder="Nhập họ tên tại đây ..."
              />

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-form"
                type={togglePassword ? "text" : "password"}
                placeholder="Điền mật khẩu ..."
              />
              {togglePassword ? (
                <i
                  className="fa-solid fa-eye"
                  onClick={togglePasswordVisibility}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-eye-slash"
                  onClick={togglePasswordVisibility}
                ></i>
              )}

              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-form"
                type={toggleConfirmPassword ? "text" : "password"}
                placeholder="Xác nhận mật khẩu ..."
              />
              {toggleConfirmPassword ? (
                <i
                  className="fa-solid fa-eye"
                  onClick={toggleConfirmPasswordVisibility}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-eye-slash"
                  onClick={toggleConfirmPasswordVisibility}
                ></i>
              )}

              <button className="snip1547" type="submit">
                <span>Đăng Ký</span>
              </button>

              <div className="flex-footer">
                <div>
                  <Link to="/">
                    <i class="fa-solid fa-house-chimney"></i>
                  </Link>
                </div>
                <div>
                  {/* <i className="fa-brands fa-facebook "></i> */}
                  <img
                    className="icon-footer"
                    src="/images/facebook.png"
                    alt=""
                  />
                </div>
                <div>
                  {/* <i className="fa-brands fa-twitter"></i> */}
                  <img className="icon-footer" src="/images/insta.png" alt="" />
                </div>
                <div>
                  {/* <i className="fa-brands fa-instagram"></i> */}
                  <img
                    className="icon-footer"
                    src="/images/twitter.png"
                    alt=""
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        ;
      </div>
    </>
  );
}
