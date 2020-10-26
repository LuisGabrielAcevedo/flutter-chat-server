const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateToken } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    // Verify email
    const existsEmail = await User.findOne({ email: email });
    if (existsEmail)
      return res.status(404).json({
        ok: false,
        msg: "The email already exits",
      });
    // Create model
    const user = new User(req.body);
    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    // Save model
    const resp = await user.save();
    // Generate token
    const token = await generateToken(user._id);

    res.status(200).json({
      ok: true,
      msg: "User created",
      data: resp,
      token,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: "Error",
      data: err,
    });
  }
};

const signIn = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    // Verify email
    const userDb = await User.findOne({ email: email });
    if (!userDb)
      return res.status(404).json({
        ok: false,
        msg: "The user not exits",
      });
    // Verify password
    const validPassword = bcryptjs.compareSync(password, userDb.password);
    if (!validPassword)
      return res.status(400).json({
        ok: false,
        msg: "The password is not valid",
      });
    // Generate token
    const token = await generateToken(userDb._id);
    res.status(200).json({
      ok: true,
      msg: "User found",
      data: userDb,
      token,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: "Error",
      data: err,
    });
  }
};

const refreshToken = async (req, res = response) => {
  try {
    // Find user
    const user = await User.findById(req.userId);
    // Generate token
    const token = await generateToken(user._id);
    res.status(200).json({
      ok: true,
      msg: "Refresh token success",
      data: user,
      token,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: "Error",
      data: err,
    });
  }
};

module.exports = {
  createUser,
  signIn,
  refreshToken,
};
