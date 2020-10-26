const express = require("express");
const path = require("path");
require("dotenv").config();

// 1. App express
const app = express();
// 2. Parser json
app.use(express.json());

// 3. Static files
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// 4. Node server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require("./sockets/sockets");

// 5. Routes
app.use("/api/users", require("./routes/auth"));

// 6. Db connection
const { dbConnection } = require("./dataBase/config");
dbConnection();

server.listen(process.env.PORT, (err) => {
  if (err) throw new Error(err);
  console.log({
    msg: `Server works in port: ${process.env.PORT}!`,
  });
});
