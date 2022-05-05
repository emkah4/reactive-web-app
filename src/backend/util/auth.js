const HttpError = require("../models/http-error");
const { Pool, Client } = require("pg");
const pool = new Pool();

// For handling access tokens
const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    const error = new HttpError("Something went wrong. Unauthorized", 401);
    throw error;
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      // Sending 403 because either token is wrong or expired
      const error = new HttpError("Wrong or expired token. Forbidden", 403);
      throw error;
    }
    req.user_id = user.user;
    next();
  });
}

async function checkRefreshToken(refreshToken) {
  const response = await pool.query(
    "SELECT * FROM refresh_tokens WHERE refresh_token = $1",
    [refreshToken]
  );
  await pool.end;

  const data = response.rows;

  if (data.length === 0) {
    return false;
  } else {
    return true;
  }
}

async function put_refresh_token(refreshToken, user_id) {
  const response = await pool.query(
    "INSERT INTO refresh_tokens(user_id, refresh_token) VALUES($1, $2) RETURNING *",
    [user_id, refreshToken]
  );
  await pool.end;

  const data = response.rows;

  if (!data) {
    return false;
  } else {
    return true;
  }
}

async function delete_refresh_token(user_id) {
  const response = await pool.query(
    "DELETE FROM refresh_tokens WHERE user_id = $1",
    [user_id]
  );
  await pool.end;

  const data = response.rows;

  if (!data) {
    return false;
  } else {
    return true;
  }
}

module.exports = {
  authenticateToken,
  checkRefreshToken,
  put_refresh_token,
  delete_refresh_token,
};
