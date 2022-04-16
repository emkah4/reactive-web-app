const express = require("express");
const bodyParser = require("body-parser");

// Importing modules
const usersRoutes = require("./routes/users-routes");
const projectsRoutes = require("./routes/projects-routes");

// Importing models
const HttpError = require("./models/http-error");
const { body } = require("express-validator");

// -------------------------------- Main app.js part --------------------------------
const app = express();

app.use(bodyParser.json());

// Registering /api/users route, for interaction with users
app.use("/api/users", usersRoutes);

// Registering /api/projects route, for interaction with projects
app.use("/api/projects", projectsRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occcured!" });
});

app.listen(5000);
