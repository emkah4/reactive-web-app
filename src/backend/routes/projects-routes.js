const { Router, response } = require("express");
const { check } = require("express-validator");
const express = require("express");
const router = express.Router();

// Importing models
const HttpError = require("../models/http-error");

// Importing utils
const auth_tools = require("../util/auth");

// Importing controllers
const projectsController = require("../controllers/projects-controllers");

// Add new project
router.post(
  "/new_project",
  auth_tools.authenticateToken,
  projectsController.newProject
);

module.exports = router;
