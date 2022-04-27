const { Router, response } = require("express");
const { check } = require("express-validator");
const express = require("express");
const router = express.Router();

// Importing modules
const HttpError = require("../models/http-error");

// Importing utils
const auth_tools = require("../util/auth");

// Importing controllers
const eventsController = require("../controllers/events-controller");

router.post(
  "/add_event",
  [
    check("project_id").not().isEmpty(),
    check("event_type").not().isEmpty(),
    check("event_time").not().isEmpty(),
    check("event_text").not().isEmpty(),
    check("event_groups").not().isEmpty(),
  ],
  auth_tools.authenticateToken,
  eventsController.addEvent
);

router.get(
  "/get_events/:pid",
  auth_tools.authenticateToken,
  eventsController.getEvents
);

module.exports = router;