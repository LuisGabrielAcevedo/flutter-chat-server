const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, signIn, refreshToken } = require("../controllers/auth");
const { validateFields } = require("../midlewares/validateFields");
const { validateJwt } = require("../midlewares/validateJwt");
const router = Router();

const createUserMidlewares = [
  check("name", "The field name is required").not().isEmpty(),
  check("email", "The field email is required").not().isEmpty(),
  check("email", "The field email should be a vaild email").isEmail(),
  check("password", "The field password is required").not().isEmpty(),
  validateFields,
];
const signInMidlewares = [
  check("email", "The field email is required").not().isEmpty(),
  check("email", "The field email should be a vaild email").isEmail(),
  check("password", "The field password is required").not().isEmpty(),
  validateFields,
];

router.post("/", createUserMidlewares, createUser);
router.post("/sign-in", signInMidlewares, signIn);
router.get("/refresh-token", validateJwt, refreshToken);

module.exports = router;
