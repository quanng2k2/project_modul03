const mysql = require("mysql2");

let pool = mysql.createPool({
  host: "localhost",
  database: "project03",
  user: "root",
  password: "12345678",
  waitForConnections: true, // Đợi các kết nối nếu tất cả đều đang bận
  connectionLimit: 10, // Số lượng kết nối tối đa trong pool
  maxIdle: 10, // Số lượng kết nối không hoạt động tối đa, giá trị mặc định giống với `connectionLimit`
  idleTimeout: 60000, // Thời gian chờ kết nối không hoạt động, tính bằng mili giây, giá trị mặc định là 60000
  queueLimit: 0, // Giới hạn số lượng yêu cầu kết nối được xếp hàng, 0 có nghĩa là không giới hạn
  enableKeepAlive: true, // Bật gửi gói tin keep-alive trên các kết nối
  keepAliveInitialDelay: 0, // Thời gian chờ ban đầu trước khi gửi gói tin keep-alive, được đặt là 0
});

let database = pool.promise();
module.exports = database;
