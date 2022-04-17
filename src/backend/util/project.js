const axios = require("axios");
const { Pool, Client } = require("pg");
const { response } = require("express");
const pool = new Pool();

// Importing models
const HttpError = require("../models/http-error");
const Project = require("../models/project");

// Function that inserts new project to database, and initiates insertion of project groups and project groups members. Also returns whole project object with id's from database
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

  const project_data = new Project(
    data.rows[0].id,
    data.rows[0].project_title,
    data.rows[0].project_creation_date,
    data.rows[0].project_status
  );

  let groups_data = await Promise.all(
    project.groups.map(async (group) => {
      let group_data;

      try {
        group_data = await addProjectGroup(data.rows[0].id, group);
      } catch (error) {
        return next(error);
      }

      return await group_data;
    })
  );

  if (!groups_data) {
    const error = new HttpError("Could not insert Groups.", 503);
    throw error;
  }

  project_data.addGroups(groups_data);

  return project_data;
}

// Function that inserts groups into the database and initiates group members insertion into database, and returns object with is's from database
async function addProjectGroup(project_id, group, project_data) {
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
  }

  let members_data = await Promise.all(
    group.group_members.map(async (member) => {
      let member_data;

      try {
        member_data = await addGroupMemeber(data.rows[0].id, member);
      } catch (error) {
        return next(error);
      }

      return await member_data;
    })
  );

  if (!members_data) {
    const error = new HttpError("Could not insert Members.", 503);
    throw error;
  }

  data.rows[0].group_members = members_data;

  return data.rows[0];
}

// Function that inserts project group members into the database and returns object with id's from the database
async function addGroupMemeber(group_id, member) {
  const response = await pool.query(
    "INSERT INTO project_group_members(group_id, member_name, member_email, member_phone_number) VALUES ($1, $2, $3, $4) RETURNING *",
    [group_id, member.name, member.email, member.phone_number]
  );

  await pool.end;

  const data = response;

  if (!data) {
    const error = new HttpError(
      "Could not insert data into project_group_members table.",
      503
    );
    throw error;
  }

  return data.rows[0];
}

module.exports = {
  addProject,
};
