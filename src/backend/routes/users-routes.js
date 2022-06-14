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
    check("security_question_id").not().isEmpty(),
    check("security_answer").not().isEmpty(),
  ],
  usersController.registerUser
);

// Login a user
router.post(
  "/login_user",
  [check("email").isEmail(), check("password").isLength({ min: 5 })],
  usersController.loginUser
);

// Route for token refreshing with refresh tokens from cookies
router.get("/token", usersController.tokenRefresh);

// Route to login users from the system and delete refresh token from database
router.delete("/logout_user", usersController.logoutUser);

// Route that returns a security question id if the users requests so using email
router.post(
  "/forgotPassword",
  [check("email").isEmail()],
  usersController.forgotPassword
);

router.post(
  "/confirmAnswer",
  [
    check("email").isEmail(),
    check("security_answer").not().isEmpty(),
    check("password").isLength({ min: 5 }),
  ],
  usersController.confirmAnswer
);

module.exports = router;
