const axios = require("axios");
const HttpError = require("../models/http-error");
const { Pool, Client } = require("pg");
const { response } = require("express");
const pool = new Pool();

async function addProject(project, user_id) {
  const response = await pool.query(
    "INSERT INTO projects(user_id, project_title, project_creation_date, project_last_updated, project_status) VALUES ($1, $2, current_timestamp, current_timestamp, $3) RETURNING *",
    [user_id, project.project_title, project.project_status]
  );

  await pool.end;

  const data = response;

  if (!data) {
    const error = new HttpError("Could not insert data into database.", 503);
    throw error;
  }

  const groupsAdded = await addProjectGroups(data.rows[0].id, project.groups);

  if (!groupsAdded) {
    const error = new HttpError("Could not insert Groups.", 503);
    throw error;
  }

  return data.rows[0].id;
}

async function addProjectGroups(project_id, groups) {
  let added_groups = true;
  groups.forEach(async (group) => {
    const response = await pool.query(
      "INSERT INTO project_groups(project_id, group_title, group_color) VALUES ($1, $2, $3) RETURNING *",
      [project_id, group.group_title, group.group_color]
    );

    await pool.end;

    const data = response;

    if (!data) {
      const error = new HttpError(
        "Could not insert data into project_groups table.",
        503
      );
      throw error;
      added_groups = false;
    }
  });

  return added_groups;
}

module.exports = {
  addProject,
};
