const { validationResult } = require("express-validator");

// For handling access tokens
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Importing modules
const HttpError = require("../models/http-error");

// Importing utils
const auth_tools = require("../util/auth");
const event_tools = require("../util/event");

const addEvent = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs, check data.", 422));
  }

  const user_id = req.user_id;
  let event = req.body;
  let event_id;

  try {
    event_id = await event_tools.addEvent(event, user_id);
  } catch (error) {
    return next(error);
  }

  res.status(201).json({ event_id: event_id });
};

const getEvents = async (req, res, next) => {
  const user_id = req.user_id;
  if (!user_id) {
    const error = new HttpError("No user_id provided. Unauthorized.", 401);
    return next(error);
  }

  const project_id = req.params.pid;
  if (!project_id) {
    const error = new HttpError("No project_id provided. Not found.", 404);
    return next(error);
  }

  let events;
  try {
    events = await event_tools.getEvents(project_id);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ events: events });
};

exports.addEvent = addEvent;
exports.getEvents = getEvents;
