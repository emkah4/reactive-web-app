const { Router, response } = require("express");
const { check } = require("express-validator");
const express = require("express");
const router = express.Router();

// Importing controllers
const usersController = require("../controllers/users-controller");
const auth_tools = require("../util/auth");

// Get list of all users
router.get("/get_user", auth_tools.authenticateToken, usersController.getUser);

// Register a user
router.post(
  "/register_user",
  [
    check("f_name").not().isEmpty(),
    check("l_name").not().isEmpty(),
    check("email").isEmail(),
    check("password").isLength({ min: 5 }),
  ],
  usersController.registerUser
);

// Login a user
router.post(
  "/login_user",
  [check("email").isEmail(), check("password").isLength({ min: 5 })],
  usersController.loginUser
);

router.post(
  "/token",
  [check("refreshToken").not().isEmpty()],
  usersController.tokenRefresh
);

router.delete(
  "/logout_user",
  auth_tools.authenticateToken,
  usersController.logoutUser
);

module.exports = router;
