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

const getProjects = async (req, res, next) => {
  let user_id = req.user_id;

  let projects;

  try {
    projects = await project_tools.getProjects(user_id);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ projects: projects });
};

const getProject = async (req, res, next) => {
  let project_id = req.params.pid;

  if (!project_id) {
    return next(new HttpError("No project id provided. Forbidden.", 403));
  }

  let project;
  try {
    project = await project_tools.getProject(project_id);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ project: project });
};

const shareProject = async (req, res, next) => {
  const user_id = req.user_id;
  let sharing_data = req.body;

  let response;
  try {
    response = await project_tools.shareProject(
      user_id,
      sharing_data.recipient_email,
      sharing_data.project_id
    );
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ message: "Succesfully shared the project" });
};

const getSharedProjects = async (req, res, next) => {
  const user_id = req.user_id;

  if (user_id === null) {
    const error = new HttpError("No user id given. Wrong token.", 404);
    return next(error);
  }

  let projects = await project_tools.getSharedProjects(user_id);

  res.status(200).json({ projects: projects });
};

exports.newProject = newProject;
exports.getProjects = getProjects;
exports.getProject = getProject;
exports.shareProject = shareProject;
exports.getSharedProjects = getSharedProjects;
