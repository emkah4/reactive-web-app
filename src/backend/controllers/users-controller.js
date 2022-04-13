const { validationResult } = require("express-validator");

// Importing modules
const HttpError = require("../models/http-error");
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

exports.getUsers = getUsers;
exports.registerUser = registerUser;
