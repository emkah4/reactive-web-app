const axios = require("axios");
const HttpError = require("../models/http-error");
const { Pool, Client } = require("pg");
const pool = new Pool();

async function getUsersFromDb() {
  const response = await pool.query("SELECT * FROM users");
  await pool.end;

  const data = response;

  if (!data) {
    const error = new HttpError("Could not fetch data from database.", 503);
    throw error;
  }

  return data;
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

  // Updating is_logged_in in database
  const response = await pool.query(
    "UPDATE users SET is_logged_in = true WHERE id = $1",
    [user_id]
  );
  await pool.end;

  const logged_in = response;

  // Checking if updating is_logged_in was successful
  if (!logged_in) {
    const error = new HttpError("Could not log in. Server error", 503);
    throw error;
  }

  // Returning user_id if everything is ok
  return user_id;
}

async function logOutUser(user_id) {
  const response = await pool.query(
    "UPDATE users SET is_logged_in = false WHERE id = $1",
    [user_id]
  );
  await pool.end;

  const data = response;

  if (!data) {
    const error = new HttpError("Something went wrong", 500);
    throw error;
  } else {
    return true;
  }
}

module.exports = {
  getUsersFromDb,
  addUserToDb,
  logInUser,
  logOutUser,
};
