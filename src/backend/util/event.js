const axios = require("axios");
const { Pool, Client } = require("pg");
const { response } = require("express");
const pool = new Pool();

// Importing models
const HttpError = require("../models/http-error");
const project = require("./project");

// Adding events to database (when creating new events)
async function addEvent(event) {
  const response = await pool.query(
    "INSERT INTO events(project_id, event_time, event_text, event_type) VALUES ($1, $2, $3, $4) RETURNING *",
    [event.project_id, event.event_time, event.event_text, event.event_type]
  );

  await pool.end;

  const data = response;

  if (!data) {
    const error = new HttpError(
      "Could not insert data into events table.",
      503
    );
    throw error;
  }

  let groups_data = await Promise.all(
    event.event_groups.map(async (group) => {
      let group_data;

      try {
        group_data = await addEventGroup(data.rows[0].id, group);
      } catch (error) {
        throw error;
      }

      return await group_data;
    })
  );

  if (!groups_data) {
    const error = new HttpError(
      "Could not insert data into event_groups table.",
      503
    );
    throw error;
  }

  const gettingReadyEvent = await pool.query(
    "SELECT e.id, e.event_time, e.event_text, string_agg(eg.group_id::TEXT, ',') AS groups, e.event_type, string_agg(ef.filename::TEXT, ',') as filename, string_agg(ef.filetype::TEXT, ',') as filetype FROM events AS e INNER JOIN event_types AS et ON e.event_type = et.id INNER JOIN event_groups as eg ON e.id = eg.event_id INNER JOIN project_groups as pg ON eg.group_id = pg.id LEFT JOIN event_files as ef ON e.id = ef.event_id WHERE e.id = $1 GROUP BY e.id",
    [data.rows[0].id]
  );

  await pool.end;

  const eventData = gettingReadyEvent.rows[0];

  if (!eventData) {
    const error = new HttpError("Could not get data from database.", 503);
    throw error;
  }

  return eventData;
}

// Function adding event groups pairs to database (when creating or updating events)
async function addEventGroup(event_id, group_id) {
  const response = await pool.query(
    "INSERT INTO event_groups(event_id, group_id) VALUES ($1, $2) RETURNING *",
    [event_id, group_id]
  );

  await pool.end;

  const data = response.rows[0];

  if (!data) {
    const error = new HttpError(
      "Could not insert data into event_groups table.",
      503
    );

    throw error;
  }

  return data;
}

async function getEvents(project_id) {
  const response = await pool.query(
    "SELECT e.id, e.event_time, e.event_text, string_agg(eg.group_id::TEXT, ',') AS groups, e.event_type, string_agg(ef.filename::TEXT, ',') as filename, string_agg(ef.filetype::TEXT, ',') as filetype FROM events AS e INNER JOIN event_types AS et ON e.event_type = et.id INNER JOIN event_groups as eg ON e.id = eg.event_id INNER JOIN project_groups as pg ON eg.group_id = pg.id LEFT JOIN event_files as ef ON e.id = ef.event_id WHERE e.project_id = $1 GROUP BY e.id;",
    [project_id]
  );

  await pool.end;

  const events = response.rows;
  if (!events) {
    const error = new HttpError(
      "Could not find any event for this project. Not found.",
      404
    );
    throw error;
  }

  return events;
}

async function editEvent(event_data) {
  if (event_data.property_key === "event_text") {
    const response = await pool.query(
      "UPDATE events SET event_text = $1 WHERE id = $2 RETURNING *",
      [event_data.property_value, event_data.event_id]
    );
  } else if (event_data.property_key === "event_time") {
    const response = await pool.query(
      "UPDATE events SET event_time = $1 WHERE id = $2 RETURNING *",
      [event_data.property_value, event_data.event_id]
    );
  }

  await pool.end;

  if (!response) {
    const error = new HttpError(
      "Could not update event. Something is wrong.",
      503
    );
    throw error;
  }

  return response;
}

async function deleteEvent(eventId) {
  const eventGroupsResponse = await pool.query(
    "DELETE FROM event_groups WHERE event_id = $1",
    [eventId]
  );

  await pool.end;
  if (!eventGroupsResponse) {
    const error = new HttpError("Could not delete from event_groups.", 503);
    throw error;
  } else {
    // Deleting file references from database
    const filesResponse = await pool.query(
      "DELETE FROM event_files WHERE event_id = $1",
      [eventId]
    );

    await pool.end;

    const eventResponse = await pool.query("DELETE FROM events WHERE id = $1", [
      eventId,
    ]);

    await pool.end;

    if (!eventResponse) {
      const error = new HttpError("Could not delete from events.", 503);
      throw error;
    } else {
      return eventResponse;
    }
  }
}

async function getEventTypes() {
  const response = await pool.query("SELECT * FROM event_types");

  await pool.end;

  const eventTypes = response.rows;

  if (!eventTypes) {
    const error = new HttpError(
      "Could not retrieve any event types from database",
      500
    );
    throw error;
  }

  return eventTypes;
}

async function getEvent(eventId) {
  const response = await pool.query(
    "SELECT e.*, ef.filetype, ef.filename FROM events AS e LEFT JOIN event_files AS ef ON e.id = ef.event_id WHERE e.id = $1",
    [eventId]
  );

  await pool.end;

  const event = response.rows[0];

  if (!event) {
    const error = new HttpError("Could not find the event.", 404);
    throw error;
  }

  return event;
}

async function fileUpload(files, event_id) {
  ("INSERT INTO event_groups(event_id, group_id) VALUES ($1, $2) RETURNING *");

  let uploadsResponse = await Promise.all(
    files.map(async (file) => {
      let response_data;
      try {
        response_data = await singleFileUpload(file, event_id);
      } catch (error) {
        console.log(error);
        throw error;
      }

      return response_data;
    })
  );

  return true;
}

async function singleFileUpload(file, event_id) {
  const response = await pool.query(
    "INSERT INTO event_files(event_id, filename, filetype) VALUES ($1, $2, $3) RETURNING *",
    [event_id, file.filename, file.mimetype]
  );

  const data = response.rows;

  if (data.length === 0) {
    const error = new HttpError("Could not insert into database.", 500);
    throw error;
  }

  return data.rows;
}

module.exports = {
  addEvent,
  getEvents,
  editEvent,
  deleteEvent,
  getEventTypes,
  getEvent,
  fileUpload,
};
