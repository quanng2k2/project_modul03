const express = require("express");
const router = express.Router();
const database = require("../utils/database");

router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM categories";
    const [result] = await database.execute(query);

    if (result.length > 0) {
      return res.status(200).json({
        status: 200,
        data: result,
      });
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
});

// API lấy toàn bộ thông tin bản ghi rooms kèm ảnh và các trường khác theo categoryId
// API lấy toàn bộ thông tin bản ghi rooms kèm ảnh và các trường khác theo categoryId
router.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const query = `
    SELECT r.roomId, r.userId, r.roomName, r.descriptions, r.price, r.location, r.created_at, c.categoryId, i.imagePath
    FROM rooms as r
    JOIN categories as c ON r.categoryId = c.categoryId
    LEFT JOIN images i ON r.roomId = i.roomId
    WHERE r.categoryId = ?;
      `;
    const [result] = await database.execute(query, [categoryId]);

    const rooms = result.reduce((accumulator, room) => {
      const existingRoom = accumulator.find(
        (item) => item.roomId === room.roomId
      );

      if (existingRoom) {
        existingRoom.images.push({ imagePath: room.imagePath });
      } else {
        accumulator.push({
          roomId: room.roomId,
          userId: room.userId,
          roomName: room.roomName,
          descriptions: room.descriptions,
          price: room.price,
          location: room.location,
          created_at: room.created_at,
          categoryId: room.categoryId,
          images: room.imagePath ? [{ imagePath: room.imagePath }] : [],
        });
      }

      return accumulator;
    }, []);

    res.json({
      message: "success",
      rooms: rooms,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi khi lấy thông tin phòng" });
  }
});

module.exports = router;
