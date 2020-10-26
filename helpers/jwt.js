const jwt = require("jsonwebtoken");

const generateToken = (_id) => {
  return new Promise((resolve, reject) => {
    const payload = {
      _id,
    };

    jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    );
  });
};

module.exports = {
  generateToken,
};
