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

// Get all user projects
router.get(
  "/get_projects",
  auth_tools.authenticateToken,
  projectsController.getProjects
);

router.get(
  "/get_project/:pid",
  auth_tools.authenticateToken,
  projectsController.getProject
);

// Sharing the project
router.post(
  "/share_project",
  [check("project_id").not().isEmpty(), check("recipient_email").isEmail()],
  auth_tools.authenticateToken,
  projectsController.shareProject
);

// This endpoint will return list of shared projects
router.get(
  "/get_shared_projects",
  auth_tools.authenticateToken,
  projectsController.getSharedProjects
);

module.exports = router;
