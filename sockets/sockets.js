const { io } = require("../index");

io.on("connection", (client) => {
  client.emit("active-bands", bands.getBands());
  console.log(client);
  client.on("disconnect", () => {
    // console.log("Disconnected");
  });
});
