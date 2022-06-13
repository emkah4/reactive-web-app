const axios = require("axios");
const HttpError = require("../models/http-error");
const { Pool, Client } = require("pg");
const pool = new Pool();
const auth_tools = require("./auth");
const bcrypt = require("bcrypt");

// Constants
const saltRounds = 10;

// Function to get a user from database by user id -------------------------------------------------------------
async function getUserFromDb(user_id) {
  const response = await pool.query("SELECT * FROM users WHERE id = $1", [
    user_id,
  ]);
  await pool.end;

  const data = response;

  if (!data) {
    const error = new HttpError("Could not fetch data from database.", 503);
    throw error;
  }

  return data.rows;
}

// Function to add a user to database --------------------------------------------------------------------------
async function addUserToDb(
  f_name,
  l_name,
  email,
  password,
  security_question_id,
  security_answer
) {
  // Getting all users with provided email address from database
  const checkIfEmailIsTaken = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  await pool.end;

  const rowCount = checkIfEmailIsTaken.rowCount;

  // Checking if there was anything returned
  if (rowCount !== 0) {
    // If was -> returning 409, indicating that user with this email address already exists
    const error = new HttpError("User with this email already exists!", 409);
    throw error;
  }

  // Hashing the password using function getHashedPassword (it is below)
  const hashedPassword = await getHashedPassword(password);

  if (hashedPassword === null) {
    const error = new HttpError("Could not hash the password.", 503);
    throw error;
  }

  // If previous check is ok, adding a new user to the database
  const addToDbResponse = await pool.query(
    "INSERT INTO users(f_name, l_name, email, password, security_question_id, security_answer) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
    [
      f_name,
      l_name,
      email,
      hashedPassword,
      security_question_id,
      security_answer,
    ]
  );

  await pool.end;

  const data = addToDbResponse.rows;

  if (!data) {
    const error = new HttpError("Could not register user to a database", 503);
    throw error;
  }

  // If everything is all right -> returning newly created user id
  return data[0].id;
}

// Function to login and auth user with db ---------------------------------------------------------------------
async function logInUser(email, password) {
  // Getting user by email
  const data = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  await pool.end;

  const user = data.rows[0];

  // Checking if user with this email exists
  if (!user) {
    const error = new HttpError("Could not find user. Not found.", 404);
    throw error;
  }

  // Checking if passwords match
  const passwordsMatched = await comparePasswords(password, user.password);
  if (!passwordsMatched) {
    const error = new HttpError("Wrong password. Forbidden.", 403);
    throw error;
  }

  const user_id = user.id;

  // Returning user_id if everything is ok
  return user_id;
}

// Function to logout a user -----------------------------------------------------------------------------------
async function logOutUser(user_id) {
  let is_logged_out;
  try {
    is_logged_out = await auth_tools.delete_refresh_token(user_id);
  } catch (error) {
    throw error;
  }
  return is_logged_out;
}

// Function for hashing password -------------------------------------------------------------------------------
async function getHashedPassword(plainPassword) {
  try {
    // Generating a salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Hashing the password
    return await bcrypt.hash(plainPassword, salt);
  } catch (error) {
    console.log(error);
  }

  return null;
}

async function comparePasswords(plainPassword, hashedPassword) {
  try {
    // Compare password
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.log(error);
  }

  // Return false if error
  return false;
}

// Function that returns the security question id
async function getSecurityQuestionData(email) {
  // Getting all users with provided email address from database
  const checkIfUserExists = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  await pool.end;

  const rowCount = checkIfUserExists.rowCount;

  // Checking if there was anything returned
  if (rowCount == 0) {
    // If was -> returning 409, indicating that user with this email address already exists
    const error = new HttpError("User with this email does not exist!", 409);
    throw error;
  } else {
    const security_data = await pool.query(
      "SELECT security_question_id FROM users WHERE email = $1",
      [email]
    );

    return security_data;
  }
}

async function compareSecurityAnswers(email, submitted_answer) {
  const security_answer = await pool.query(
    "SELECT security_answer FROM users WHERE email = $1",
    [email]
  );
  if (
    security_answer.rows[0].security_answer.toLowerCase() ==
    submitted_answer.toLowerCase()
  ) {
    return true;
  } else return false;
}

async function changePassword(email, plainPassword) {
  const newHashedPassword = await getHashedPassword(plainPassword);

  if (newHashedPassword === null) {
    const error = new HttpError("Could not hash the password.", 503);
    return error;
  } else {
    const temp_name = await pool.query(
      "UPDATE users SET password = $2 WHERE email = $1",
      [email, newHashedPassword]
    );
    pool.end;

    return true;
  }
}

module.exports = {
  getUserFromDb,
  addUserToDb,
  logInUser,
  logOutUser,
  getSecurityQuestionData,
  compareSecurityAnswers,
  changePassword,
};
