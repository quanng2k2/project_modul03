const express = require("express");
const router = express.Router();
const database = require("../utils/database");

// lấy về tất cả bản ghi table bookings
router.get("/", async (req, res) => {
  try {
    // Sử dụng database để lấy về toàn bộ user
    const [bookings] = await database.execute(
      `SELECT u.*, b.*, r.*
      FROM users AS u
      JOIN bookings AS b ON u.userId = b.userId
      JOIN rooms AS r ON b.roomId = r.roomId`
    );
    console.log(bookings);

    // Response về cho client
    res.json({
      message: "success",
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// api get 1 user 1 thông tin đặt phòng
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    // Thực hiện câu truy vấn SQL để lấy thông tin đặt phòng của người dùng và thông tin phòng
    const query = `
    SELECT b.*, r.roomName, r.descriptions, r.price, r.location
    FROM bookings AS b
    JOIN rooms AS r ON b.roomId = r.roomId
    WHERE b.userId = ?
    `;
    const [bookings] = await database.execute(query, [userId]);

    // Kiểm tra nếu không có bản ghi nào được tìm thấy
    if (bookings.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy thông tin đặt phòng cho người dùng này",
      });
    }

    res.json({
      message: "success",
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// api đặt phòng
router.post("/", async (req, res) => {
  const {
    userId,
    roomId,
    startDate,
    endDate,
    guests,
    total_price,
    created_at,
  } = req.body;

  try {
    // Thực hiện câu truy vấn SQL để chèn thông tin đặt phòng vào cơ sở dữ liệu
    const insertBooking = `INSERT INTO bookings (userId, roomId, startDate, endDate, guests, total_price, created_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    await database.execute(insertBooking, [
      userId,
      roomId,
      startDate,
      endDate,
      guests,
      total_price,
      created_at,
    ]);

    res.status(200).json({ message: "Đặt phòng thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Đặt phòng không thành công" });
  }
});

// api xóa booking theo userId booking
router.delete("/:userId/:bookingId", async (req, res) => {
  const { userId, bookingId } = req.params;

  try {
    // Thực hiện câu truy vấn SQL để xóa booking dựa trên userId và bookingId
    const deleteBooking = `DELETE FROM bookings WHERE userId = ? AND bookingId = ?`;
    const [result] = await database.execute(deleteBooking, [userId, bookingId]);

    // Kiểm tra nếu không có bản ghi nào bị xóa
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Không tìm thấy booking để xóa",
      });
    }

    res.json({ message: "Xóa booking thành công" });
  } catch (error) {
    res.status(500).json({ error: "Xóa booking không thành công" });
  }
});

module.exports = router;
