const jwt = require("jsonwebtoken");

const validateJwt = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "The authorization is required.",
      data: err,
    });
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_KEY);
    req.userId = _id;
    next();
  } catch (err) {
    return res.status(401).json({
      ok: false,
      msg: "Invalid token.",
      data: err,
    });
  }
};

module.exports = {
  validateJwt,
};
