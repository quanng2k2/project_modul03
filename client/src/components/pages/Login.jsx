import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/login.css";
import axios from "axios";
import { message } from "antd";

export default function Login() {
  const [emailes, setEmailes] = useState("");
  const [passwordes, setPasswordes] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [password, setPassword] = useState(false);
  const togglePassword = () => {
    setPassword(!password);
  };

  const newUsers = {
    email: emailes,
    passwords: passwordes,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailes || !passwordes) {
      message.error("Email hoặc mật khẩu không được để trống !!!", 1);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/login",
        newUsers
      );
      localStorage.setItem("flagUser", JSON.stringify(res.data.data));

      // Lấy vai trò từ res.data.data và chuyển hướng tùy thuộc vào vai trò
      const role = res.data.data.roles;
      if (role === "admin") {
        navigate("/admin-home");
      } else if (role === "user") {
        navigate("/");
      }

      // Hiển thị thông báo thành công
      message.success("Đăng nhập thành công!", 1);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("Email hoặc mật khẩu không đúng.");
      }
    }
  };

  message.config({
    duration: 2, // Hiển thị thông báo trong vòng 2 giây
  });

  return (
    <>
      <div className="background-body">
        <h4 className="title">
          Đăng nhập ngay để trải nghiệm dịch vụ của chúng tôi
        </h4>
        <div className="container-signup">
          <div className="item-img">
            <img src="/images/background-login.jpg" alt="" />
          </div>
          <div className="item-form">
            <form action="" className="form-login" onSubmit={handleSubmit}>
              <input
                value={emailes}
                onChange={(e) => setEmailes(e.target.value)}
                className="input-form"
                type="text"
                placeholder="Nhập email tại đây ..."
              />

              <div>
                <input
                  value={passwordes}
                  onChange={(e) => setPasswordes(e.target.value)}
                  className="input-form"
                  type={password ? "text" : "password"}
                  placeholder="Nhập mật khẩu ..."
                />
                {password ? (
                  <i className="fa-solid fa-eye" onClick={togglePassword}></i>
                ) : (
                  <i
                    className="fa-solid fa-eye-slash"
                    onClick={togglePassword}
                  ></i>
                )}
                {/* <i className="fa-solid fa-eye-slash"></i>
                <i className="fa-solid fa-eye"></i> */}
              </div>

              <button id="button-login" className="snip15478" type="submit">
                <span>Đăng nhập</span>
              </button>

              {error && <p className="error-message">{error}</p>}

              <div id="icon-login" className="flex-footer">
                <div>
                  <Link to="/">
                    <i class="fa-solid fa-house-chimney"></i>
                  </Link>
                </div>
                <div>
                  <img
                    className="icon-footer"
                    src="/images/facebook.png"
                    alt=""
                  />
                </div>
                <div>
                  <img className="icon-footer" src="/images/insta.png" alt="" />
                </div>
                <div>
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
      </div>
    </>
  );
}
