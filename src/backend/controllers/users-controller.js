const { validationResult } = require("express-validator");

// For handling access tokens
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Importing modules
const HttpError = require("../models/http-error");
const user = require("../util/user");
const user_tools = require("../util/user");
const auth_tools = require("../util/auth");

const getUser = async (req, res, next) => {
  let user_data;
  try {
    user_data = await user_tools.getUserFromDb(req.user_id);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ user: user_data });
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

  const accessToken = jwt.sign(
    { user: user_id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "30m",
    }
  );
  const refreshToken = jwt.sign(
    { user: user_id },
    process.env.REFRESH_TOKEN_SECRET
  );

  const added_to_db = await auth_tools.put_refresh_token(refreshToken, user_id);

  if (added_to_db) {
    res
      .status(200)
      .json({ access_token: accessToken, refreshToken: refreshToken });
  } else {
    return next(new HttpError("Internal server error.", 500));
  }
};

const tokenRefresh = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return next(new HttpError("Invalid inputs, check data", 422));
  }

  // Handling refresh token check
  const refreshToken = req.body.token;
  if (!refreshToken) {
    return next(new HttpError("No tocken provided. Unauthorized", 401));
  }

  // Checking if token is in database
  try {
    is_in_database = await auth_tools.checkRefreshToken(refreshToken);
  } catch (error) {
    return next(error);
  }

  if (is_in_database) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return next(new HttpError("Wrong token. Forbidden.", 403));
      }
      console.log(user.user);
      const accessToken = jwt.sign(
        { user: user.user },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "30m",
        }
      );
      res.json({ accessToken: accessToken });
    });
  } else {
    return next(new HttpError("Token is not found. Login please.", 401));
  }
};

// This function is used to logout users, update param in database: is_logged_in to false
const logoutUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs, check data", 422));
  }

  const user_id = req.user_id;

  let user_logged_out;
  try {
    user_logged_out = await user_tools.logOutUser(user_id);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ is_logged_out: user_logged_out });
};

exports.getUser = getUser;
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.tokenRefresh = tokenRefresh;
exports.logoutUser = logoutUser;
