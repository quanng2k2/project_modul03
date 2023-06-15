const database = require("../utils/database");

async function checkEmailExists(email) {
  try {
    const query = "SELECT * FROM project03.Users WHERE email = ?";
    const [rows] = await database.execute(query, [email]);
    return rows.length > 0;
  } catch (error) {
    throw error;
  }
}

async function validateSignUp(req, res, next) {
  const { username, passwords, email, created_at, roles } = req.body;

  // Kiểm tra các trường bắt buộc
  if (!username || !passwords || !email || !created_at || !roles) {
    return res.status(400).json({ error: "Vui lòng điền đầy đủ thông tin" });
  }

  try {
    // Kiểm tra trùng email
    const existingUser = await checkEmailExists(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email đã được đăng ký trước đó" });
    }
    // Tiếp tục thực hiện các middleware và route tiếp theo
    next();
  } catch (error) {
    console.log("Lỗi kiểm tra email !!!", error);
    return res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
}

module.exports = validateSignUp;
