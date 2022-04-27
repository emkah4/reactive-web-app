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

  return data.rows[0].id;
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
    "SELECT e.id, e.event_time, e.event_text, string_agg(eg.group_id::TEXT, ',') AS groups, e.event_type FROM events AS e INNER JOIN event_types AS et ON e.event_type = et.id INNER JOIN event_groups as eg ON e.id = eg.event_id INNER JOIN project_groups as pg ON eg.group_id = pg.id WHERE e.project_id = $1 GROUP BY e.id;",
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

module.exports = {
  addEvent,
  getEvents,
};