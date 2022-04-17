const { validationResult } = require("express-validator");

// For handling access tokens
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Importing modules
const HttpError = require("../models/http-error");

// Importing utils
const auth_tools = require("../util/auth");
const project_tools = require("../util/project");

const newProject = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs, check data.", 422));
  }

  let { project } = req.body;

  let project_data;

  try {
    project_data = await project_tools.addProject(project, req.user_id);
  } catch (error) {
    return next(error);
  }

  res.status(201).json({ project: project_data });
};

exports.newProject = newProject;
