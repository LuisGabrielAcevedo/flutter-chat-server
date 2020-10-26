const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  try {
    const connection = await initConection();
    console.log(connection);
  } catch (err) {
    console.log(err);
    throw new Error("Data base error");
  }
};

function initConection() {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      process.env.DB_URL,
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
      (err, res) => {
        if (err) reject(err);
        resolve({
          msg: `Data base works!`,
        });
      }
    );
  });
}

module.exports = {
  dbConnection,
};
