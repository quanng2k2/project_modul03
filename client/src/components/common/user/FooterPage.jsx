import React from "react";
import "./css/footer.css";

export default function FooterPage() {
  return (
    <div>
      <>
        {/* Footer */}
        <footer className="footer text-center text-lg-start bg-light text-muted">
          {/* Section: Social media */}
          <section className="social-media-section border-bottom">
            {/* Left */}
            <div className="me-5 d-none d-lg-block">
              <h5>Đăng nhập bằng cách liên kết qua các trang mạng xã hội :</h5>
            </div>
            {/* Left */}
            {/* Right */}
            <div>
              <section className="mb-4">
                {/* Facebook */}
                <a
                  className="btn text-white btn-floating m-1 social-icon facebook"
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-facebook-f" />
                </a>
                {/* Twitter */}
                <a
                  className="btn text-white btn-floating m-1 social-icon twitter"
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-twitter" />
                </a>
                {/* Google */}
                <a
                  className="btn text-white btn-floating m-1 social-icon google"
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-google" />
                </a>
                {/* Instagram */}
                <a
                  className="btn text-white btn-floating m-1 social-icon instagram"
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-instagram" />
                </a>
                {/* Linkedin */}
                <a
                  className="btn text-white btn-floating m-1 social-icon linkedin"
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-linkedin-in" />
                </a>
              </section>
            </div>
            {/* Right */}
          </section>

          {/* Section: Social media */}
          {/* Section: Links  */}
          <section className="">
            <div className="container text-center text-md-start mt-5">
              {/* Grid row */}
              <div className="row mt-3">
                {/* Grid column */}
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  {/* Content */}
                  <h6 className="text-uppercase fw-bold mb-4">
                    <i className="fas fa-gem me-3" />
                    Airbnb Luxury.vn
                  </h6>
                  <p>
                    - Tại Airbnb Luxury ,bạn có thể book phòng online nhanh gọn
                    tiện lợi ở những khách sạn bạn muốn thông tin các phòng minh
                    bạch , rõ ràng .
                  </p>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  {/* Links */}
                  <h6 className="text-uppercase fw-bold mb-4">
                    Khách sạn nổi bật{" "}
                  </h6>
                  <p>
                    <a href="#!" className="text-reset">
                      Đà Lạt
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Sa Pa
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Nha Trang
                    </a>
                  </p>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  {/* Links */}
                  <h6 className="text-uppercase fw-bold mb-4">Hướng Dẫn</h6>
                  <p>
                    <a href="#!" className="text-reset">
                      Hướng dẫn đặt phòng
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Hướng dẫn thanh toán
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Hỗ trợ khách hàng
                    </a>
                  </p>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  {/* Links */}
                  <h6 className="text-uppercase fw-bold mb-4">Liên Hệ</h6>
                  <p>
                    <i className="fas fa-home me-3" /> Địa chỉ :Thanh Xuân - Hà
                    Nội
                  </p>
                  <p>
                    <i className="fas fa-envelope me-3" />
                    Email : Giaquan@gmail.com
                  </p>
                  <p>
                    <i className="fas fa-phone me-3" /> Hotline (tư vấn) :
                    1900555
                  </p>
                </div>
                {/* Grid column */}
              </div>
              {/* Grid row */}
            </div>
          </section>
          {/* Section: Links  */}
          {/* footer image start */}
          <section className="footer-img-flex">
            <div className="row">
              <div className="col-lg-2 col-md-12 mb-4 mb-md-0">
                <div
                  className="bg-image hover-overlay ripple shadow-1-strong rounded"
                  data-ripple-color="light"
                >
                  <img src="/images/img04.jpeg" className="w-100" />
                  <a href="#!">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                    />
                  </a>
                </div>
              </div>
              <div className="col-lg-2 col-md-12 mb-4 mb-md-0">
                <div
                  className="bg-image hover-overlay ripple shadow-1-strong rounded"
                  data-ripple-color="light"
                >
                  <img src="/images/img05.jpg" className="w-100" />
                  <a href="#!">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                    />
                  </a>
                </div>
              </div>
              <div className="col-lg-2 col-md-12 mb-4 mb-md-0">
                <div
                  className="bg-image hover-overlay ripple shadow-1-strong rounded"
                  data-ripple-color="light"
                >
                  <img src="/images/img01.jpeg" className="w-100" />
                  <a href="#!">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                    />
                  </a>
                </div>
              </div>
              <div className="col-lg-2 col-md-12 mb-4 mb-md-0">
                <div
                  className="bg-image hover-overlay ripple shadow-1-strong rounded"
                  data-ripple-color="light"
                >
                  <img src="/images/img02.jpeg" className="w-100" />
                  <a href="#!">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                    />
                  </a>
                </div>
              </div>
              <div className="col-lg-2 col-md-12 mb-4 mb-md-0">
                <div
                  className="bg-image hover-overlay ripple shadow-1-strong rounded"
                  data-ripple-color="light"
                >
                  <img src="/images/img03.jpeg" className="w-100" />
                  <a href="#!">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* footer image stop */}
          {/* Copyright */}
          <div
            className="text-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
          >
            Bản quyền thuộc về Store Luxury . Cung cấp bởi Quân_JR
          </div>
          {/* Copyright */}
        </footer>
        {/* Footer */}
      </>
    </div>
  );
}
