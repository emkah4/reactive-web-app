const axios = require("axios");
const HttpError = require("../models/http-error");
const { Pool, Client } = require("pg");
const pool = new Pool();
const auth_tools = require("./auth");

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

async function addUserToDb(f_name, l_name, email, password) {
  const response = await pool.query(
    "INSERT INTO users(f_name, l_name, email, password) VALUES($1, $2, $3, $4) RETURNING *",
    [f_name, l_name, email, password]
  );

  await pool.end;

  const data = response.rows;

  if (!data) {
    const error = new HttpError("Could not register user to a database", 503);
    throw error;
  }

  return data;
}

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
  if (user.password !== password) {
    const error = new HttpError("Wrong password. Forbidden.", 403);
    throw error;
  }

  const user_id = user.id;

  // Returning user_id if everything is ok
  return user_id;
}

async function logOutUser(user_id) {
  let is_logged_out;
  try {
    is_logged_out = await auth_tools.delete_refresh_token(user_id);
  } catch (error) {
    throw error;
  }
  return is_logged_out;
}

module.exports = {
  getUserFromDb,
  addUserToDb,
  logInUser,
  logOutUser,
};
