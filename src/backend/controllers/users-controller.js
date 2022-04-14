const { validationResult } = require("express-validator");

// Importing modules
const HttpError = require("../models/http-error");
const user = require("../util/user");
const user_tools = require("../util/user");

const getUsers = async (req, res, next) => {
  let users;

  try {
    users = await user_tools.getUsersFromDb();
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ users: users.rows });
};

// This function is used to resister users into system (write them to users database)
const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs, check data", 422));
  }

  let { f_name, l_name, email, password } = req.body;

  let user;
  try {
    user = await user_tools.addUserToDb(f_name, l_name, email, password);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ user: user });
};

// This function is used to log in users into the system
const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs, check data", 422));
  }

  const { email, password } = req.body;

  let user_id;

  try {
    user_id = await user_tools.logInUser(email, password);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ user_id: user_id });
};

// This function is used to logout users, update param in database: is_logged_in to false
const logoutUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs, check data", 422));
  }

  const { user_id } = req.body;

  let user_logged_out;
  try {
    user_logged_out = await user_tools.logOutUser(user_id);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ is_logged_out: user_logged_out });
};

exports.getUsers = getUsers;
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;
