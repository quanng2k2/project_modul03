const express = require("express");
const server = express();
const port = 3001;
const morgan = require("morgan");
const cors = require("cors");
// const bcrypt = require("bcrypt");

// require routes
const users = require("./routes/dataUsers.routes");
const login = require("./routes/dataLogin.routes");
const rooms = require("./routes/dataRoom.routes");
const categories = require("./routes/dataCategory.routes");
const book = require("./routes/booking.routes");

const bodyParser = require("body-parser");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(express.static("public"));

server.use(morgan("dev"));

server.use(cors());

// api users
server.use("/api/v1/users", users);
// api loginUsers
server.use("/api/v1/login", login);

// api rooms
server.use("/api/v1/rooms", rooms);

// api categories
server.use("/api/v1/categories", categories);

// api booking hotel
server.use("/api/v1/booking", book);

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
