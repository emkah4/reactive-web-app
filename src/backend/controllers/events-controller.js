const { validationResult } = require("express-validator");

// For file upload
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// For handling access tokens
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Importing modules
const HttpError = require("../models/http-error");

// Importing utils
const auth_tools = require("../util/auth");
const event_tools = require("../util/event");

// Controller for adding events to a project
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

  res.status(201).json({ event: event_id });
};

// Function that handles file uploads for event
const fileUpload = async (req, res, next) => {
  console.log(req.files); // info about file
  console.log(req.body.event_id); // event id

  let uploads;
  try {
    uploads = await event_tools.fileUpload(req.files, req.body.event_id);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ message: "Successfully uploaded files" });
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

// Controller for editing events
const editEvent = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs, check data.", 422));
  }

  let event = req.body;
  let result;

  try {
    result = await event_tools.editEvent(event);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ message: "Updated successfully." });
};

// Controller for deleting events from db
const deleteEvent = async (req, res, next) => {
  let eventId = req.params.eid;
  let result;

  try {
    result = await event_tools.deleteEvent(eventId);
  } catch (error) {
    return next(error);
  }

  res.status(200).json({ message: "Deleted successfully." });
};

const getEventTypes = async (req, res, next) => {
  let eventTypes;
  try {
    eventTypes = await event_tools.getEventTypes();
  } catch (error) {
    return next(error);
  }

  return res.status(200).json({ eventTypes: eventTypes });
};

const getEvent = async (req, res, next) => {
  let eventId = req.params.eid;
  let event;
  try {
    event = await event_tools.getEvent(eventId);
  } catch (error) {
    throw next(error);
  }
  return res.status(200).json({ event: event });
};

exports.addEvent = addEvent;
exports.fileUpload = fileUpload;
exports.getEvents = getEvents;
exports.editEvent = editEvent;
exports.deleteEvent = deleteEvent;
exports.getEventTypes = getEventTypes;
exports.getEvent = getEvent;
