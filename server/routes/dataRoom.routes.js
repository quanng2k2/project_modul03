const express = require("express");
const router = express.Router();
const database = require("../utils/database");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../public/images`);
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.split(".")[1];
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + `.${ext}`;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// API lấy toàn bộ thông tin bản ghi rooms kèm ảnh và các trường khác
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT rooms.*, images.imagePath
      FROM project03.rooms
      LEFT JOIN project03.images ON rooms.roomId = images.roomId
    `;
    const [result] = await database.execute(query);

    // Xử lý dữ liệu để gom các ảnh cùng phòng vào một mảng
    const rooms = result.reduce((acc, row) => {
      const roomIndex = acc.findIndex((room) => room.roomId === row.roomId);
      if (roomIndex === -1) {
        // Nếu phòng chưa tồn tại trong mảng acc, thêm phòng mới vào
        acc.push({
          roomId: row.roomId,
          roomName: row.roomName,
          descriptions: row.descriptions,
          price: row.price,
          location: row.location,
          created_at: row.created,
          images: row.imagePath ? [{ imagePath: row.imagePath }] : [],
        });
      } else {
        // Nếu phòng đã tồn tại trong mảng acc, thêm ảnh vào phòng đó
        acc[roomIndex].images.push({ imagePath: row.imagePath });
      }
      return acc;
    }, []);

    res.json({
      message: "success",
      rooms,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi khi lấy thông tin phòng" });
  }
});

// API lấy toàn bộ thông tin bản ghi rooms kèm ảnh và các trường khác theo id
router.get("/:id", async (req, res) => {
  try {
    const roomId = req.params.id;

    const query = `
      SELECT rooms.*, images.imagePath
      FROM project03.rooms
      LEFT JOIN project03.images ON rooms.roomId = images.roomId
      WHERE rooms.roomId = ?
    `;
    const [result] = await database.execute(query, [roomId]);

    // Kiểm tra nếu không tìm thấy phòng
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin phòng" });
    }

    // Xử lý dữ liệu để gom các ảnh cùng phòng vào một mảng
    const room = {
      roomId: result[0].roomId,
      roomName: result[0].roomName,
      descriptions: result[0].descriptions,
      price: result[0].price,
      location: result[0].location,
      created_at: result[0].created,
      images: result.map((row) => ({
        imagePath: row.imagePath,
      })),
    };

    res.json({
      message: "success",
      room,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi khi lấy thông tin phòng" });
  }
});

// api post rooms and img theo category
router.post("/", (req, res) => {
  // Middleware để tải lên nhiều ảnh và lưu trữ chúng
  upload.array("images", 5)(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // Xử lý lỗi nếu có lỗi từ Multer
      console.log(err);
      res.status(500).json({ message: "Lỗi khi tải lên ảnh" });
    } else if (err) {
      // Xử lý lỗi nếu có lỗi khác
      console.log(err);
      res.status(500).json({ message: "Lỗi khi tải lên ảnh" });
    } else {
      // Lưu trữ thông tin phòng và đường dẫn ảnh vào cơ sở dữ liệu
      try {
        const {
          userId,
          location,
          roomName,
          descriptions,
          price,
          created_at,
          categoryId,
        } = req.body;

        // Thực hiện lưu thông tin phòng vào bảng 'rooms'
        const insertRoomQuery = `
          INSERT INTO project03.rooms ( userId , location, roomName, descriptions, price , created_at ,categoryId)
          VALUES (?, ?, ?, ?, ?,?,?)
        `;

        const [insertRoomResult] = await database.execute(insertRoomQuery, [
          userId,
          location,
          roomName,
          descriptions,
          price,
          created_at,
          categoryId,
        ]);

        const roomId = insertRoomResult.insertId;

        // Lưu trữ đường dẫn ảnh vào bảng 'images'
        const images = req.files.map(
          (file) => `http://localhost:3001/images/${file.filename}`
        );
        const insertImageQuery = `
          INSERT INTO project03.images (roomId, imagePath)
          VALUES (?, ?)
        `;
        for (let i = 0; i < images.length; i++) {
          await database.execute(insertImageQuery, [roomId, images[i]]);
        }

        res.json({ message: "Tải lên ảnh thành công" });
      } catch (error) {
        // Xử lý lỗi nếu có lỗi trong quá trình lưu trữ thông tin phòng
        console.log("err", error);
        res.status(500).json({ message: "Lỗi khi lưu trữ thông tin phòng" });
      }
    }
  });
});

// api xóa theo id
router.delete("/:id", async (req, res) => {
  try {
    const roomId = req.params.id;

    // Xóa khách sạn từ bảng 'rooms'
    const deleteRoomQuery = `
      DELETE FROM project03.rooms
      WHERE roomId = ?
    `;
    await database.execute(deleteRoomQuery, [roomId]);

    // Xóa các ảnh liên quan đến khách sạn từ bảng 'images'
    const deleteImagesQuery = `
      DELETE FROM project03.images
      WHERE roomId = ?
    `;
    await database.execute(deleteImagesQuery, [roomId]);

    res.json({ message: "Xóa khách sạn thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi khi xóa khách sạn" });
  }
});

// api sửa 1 rooms theo id
router.put("/:id", upload.array("images", 5), async (req, res) => {
  try {
    const roomId = req.params.id;
    const {
      roomName,
      descriptions,
      price,
      location,
      categoryId,
      // Các trường dữ liệu khác của phòng
    } = req.body;

    // Kiểm tra nếu không tìm thấy phòng
    const checkRoomQuery = "SELECT * FROM project03.rooms WHERE roomId = ?";
    const [checkRoomResult] = await database.execute(checkRoomQuery, [roomId]);
    if (checkRoomResult.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin phòng" });
    }

    // Cập nhật thông tin phòng
    const updateRoomQuery = `
      UPDATE project03.rooms
      SET roomName = ?, descriptions = ?, price = ?, location = ?, categoryId = ?
      WHERE roomId = ?
    `;
    await database.execute(updateRoomQuery, [
      roomName,
      descriptions,
      price,
      location,
      categoryId,
      roomId,
    ]);

    // Xóa các ảnh cũ liên quan đến phòng từ bảng 'images'
    const deleteImagesQuery = `
      DELETE FROM project03.images
      WHERE roomId = ?
    `;
    await database.execute(deleteImagesQuery, [roomId]);

    // Lưu trữ đường dẫn ảnh mới vào bảng 'images'
    const images = req.files.map(
      (file) => `http://localhost:3001/images/${file.filename}`
    );
    const insertImageQuery = `
      INSERT INTO project03.images (roomId, imagePath)
      VALUES (?, ?)
    `;
    for (let i = 0; i < images.length; i++) {
      await database.execute(insertImageQuery, [roomId, images[i]]);
    }

    res.json({ message: "Cập nhật thông tin phòng và ảnh thành công" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật thông tin phòng và ảnh" });
  }
});

module.exports = router;
