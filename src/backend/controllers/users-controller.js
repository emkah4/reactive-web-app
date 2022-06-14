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

  let {
    f_name,
    l_name,
    email,
    password,
    security_question_id,
    security_answer,
  } = req.body;

  let user;
  try {
    user = await user_tools.addUserToDb(
      f_name,
      l_name,
      email,
      password,
      security_question_id,
      security_answer
    );
  } catch (error) {
    return next(error);
  }

  let tokens;

  try {
    tokens = await getAuthToken(user);
  } catch (error) {
    return next(error);
  }

  if (tokens !== null) {
    res.cookie("jwt", tokens.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken: tokens.accessToken });
  } else {
    res.status(200).json({ message: "Register but not logged in" });
  }
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
      expiresIn: "15m",
    }
  );
  const refreshToken = jwt.sign(
    { user: user_id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  const added_to_db = await auth_tools.put_refresh_token(refreshToken, user_id);

  if (added_to_db) {
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken: accessToken });
  } else {
    return next(new HttpError("Internal server error.", 500));
  }
};

// Internal function for getting access and refresh tokens
const getAuthToken = async (user_id) => {
  const accessToken = jwt.sign(
    { user: user_id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
  const refreshToken = jwt.sign(
    { user: user_id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  const added_to_db = await auth_tools.put_refresh_token(refreshToken, user_id);

  if (added_to_db) {
    return {
      accessToken,
      refreshToken,
    };
  } else {
    return next(
      new HttpError("Could not add refresh token to the database.", 500)
    );
  }
};

const tokenRefresh = async (req, res, next) => {
  // Checking if there is a refresh token in the cookies
  if (!req.cookies?.jwt) {
    return next(new HttpError("No token. Unauthorized.", 401));
  }
  const refreshToken = req.cookies.jwt;

  // Checking if token is in database
  try {
    is_in_database = await auth_tools.checkRefreshToken(refreshToken);
  } catch (error) {
    return next(error);
  }

  // If the refresh token is valid, we issue a new access token
  if (is_in_database) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return next(new HttpError("Wrong token. Forbidden.", 403));
      }
      const accessToken = jwt.sign(
        { user: user.user },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
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
  // First we check if request contains jwt refresh token in cookies
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return next(new HttpError("No token.", 204));
  }

  const refreshToken = cookies.jwt;

  // Next we decode user id from the refresh token
  let userId;
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      // Sending 403 because either token is wrong or expired
      return next(new HttpError("Wrong or expired token. Forbidden", 403));
    } else {
      userId = user.user;
    }
  });

  // Next we delete user refresh token from the database so with this token no further refresh would be possible
  let user_logged_out;
  try {
    user_logged_out = await user_tools.logOutUser(userId);
  } catch (error) {
    return next(error);
  }
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.status(200).json({ is_logged_out: user_logged_out });
};

const forgotPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs, check data", 422));
  }

  let { email } = req.body;
  try {
    security_data = await user_tools.getSecurityQuestionData(email);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({
    security_question_id: security_data.rows[0].security_question_id,
  });
};

const confirmAnswer = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs, check data", 422));
  }

  let { email, security_answer, password } = req.body;

  try {
    comparison_result = await user_tools.compareSecurityAnswers(
      email,
      security_answer
    );

    if (comparison_result != false) {
      const password_change = await user_tools.changePassword(email, password);
      console.log(password_change);
      if (password_change) {
        res.status(200).json({
          result: comparison_result,
        });
      } else {
        return next(new HttpError("Could not change password", 400));
      }
    } else {
      return next(new HttpError("Provided answer is wrong", 406));
    }
  } catch (error) {
    return next(error);
  }
};

exports.getUser = getUser;
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.tokenRefresh = tokenRefresh;
exports.logoutUser = logoutUser;
exports.forgotPassword = forgotPassword;
exports.confirmAnswer = confirmAnswer;
