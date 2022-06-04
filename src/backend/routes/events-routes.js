const { Router, response } = require("express");
const { check } = require("express-validator");
const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

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

router.post(
  "/file_upload",
  [check("event_id").not().isEmpty()],
  auth_tools.authenticateToken,
  upload.array("eventFile"),
  eventsController.fileUpload
);

router.get(
  "/get_events/:pid",
  auth_tools.authenticateToken,
  eventsController.getEvents
);

router.patch(
  "/edit_event",
  [
    check("event_id").not().isEmpty(),
    check("property_key").not().isEmpty(),
    check("property_value").not().isEmpty(),
  ],
  auth_tools.authenticateToken,
  eventsController.editEvent
);

router.delete(
  "/delete_event/:eid",
  auth_tools.authenticateToken,
  eventsController.deleteEvent
);

router.get(
  "/get_event_types",
  auth_tools.authenticateToken,
  eventsController.getEventTypes
);

router.get(
  "/get_event/:eid",
  auth_tools.authenticateToken,
  eventsController.getEvent
);

router.delete(
  "/delete_event/:eid",
  auth_tools.authenticateToken,
  eventsController.deleteEvent
);

module.exports = router;
