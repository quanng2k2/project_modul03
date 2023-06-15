const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const database = require("../utils/database");

// API đăng nhập
router.post("/", (req, res) => {
  const { email, passwords } = req.body;
  const query = "SELECT * FROM users WHERE email = ?";
  let user = null;
  database
    .execute(query, [email])
    .then(([rows, fields]) => {
      if (rows.length === 0) {
        return res.status(400).json({
          message: "Email hoặc mật khẩu không đúng",
        });
      } else {
        user = rows[0];
        console.log("user", user);
        return bcrypt.compare(passwords, user.passwords);
      }
    })
    .then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({
          message: "Email hoặc mật khẩu không đúng",
        });
      } else {
        const token = jwt.sign({ id: user.userId }, "your_srcet_key", {
          expiresIn: "1h",
        });
        return res.status(200).json({
          status: 200,
          message: "Đăng nhập thành công",
          data: user,
          token,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        status: 500,
        message: err,
      });
    });
});

module.exports = router;
