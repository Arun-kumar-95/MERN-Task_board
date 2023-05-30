const path = require("path");
const express = require("express");
const router = express.Router();

const { login, logout, register , getUserDetails } = require(path.join(
  process.cwd(),
  "./backend/controllers/userController"
));

const { isAuthenticated } = require(path.join(
  process.cwd(),
  "./backend/utils/auth"
));

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(isAuthenticated, logout);
router.route("/me").get(isAuthenticated , getUserDetails)

module.exports = router;
