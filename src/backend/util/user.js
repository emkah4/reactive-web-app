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

module.exports = {
  getUsersFromDb,
  addUserToDb,
};
