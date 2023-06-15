const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const database = require("../utils/database");
const checkSignup = require("../middleware/validateUser");

// api lấy toàn bộ thông tin bản ghi users
router.get("/", async (req, res) => {
  try {
    // Sử dụng database để lấy về toàn bộ user
    const [users] = await database.execute("SELECT * FROM Users");
    console.log(users);

    // Response về cho client
    res.json({
      message: "success",
      users,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// API thêm mới 1 bản ghi user
router.post("/", checkSignup, async (req, res) => {
  try {
    const { username, passwords, email, created_at, roles } = req.body;
    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(passwords, 10);

    // Tạo một user mới
    const newUser = [username, hashedPassword, email, created_at, roles];
    // Viết câu lệnh query string
    const queryString =
      "INSERT INTO Users(username, passwords, email, created_at, roles) VALUES (?, ?, ?, ?, ?)";

    let a = await database.execute(queryString, newUser);
    console.log(a);

    return res.status(201).json({
      status: "success",
      message: "Thêm mới thành công",
    });
  } catch (error) {
    console.log("Lỗi thêm mới !!!", error);
    return res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
});

module.exports = router;
