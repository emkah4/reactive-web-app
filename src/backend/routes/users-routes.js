const { Router, response } = require("express");
const { check } = require("express-validator");
const express = require("express");
const router = express.Router();

// Importing controllers
const usersController = require("../controllers/users-controller");

// Get list of all users
router.get("/get_users", usersController.getUsers);

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

router.delete(
  "/logout_user",
  [check("user_id").not().isEmpty()],
  usersController.logoutUser
);

module.exports = router;
