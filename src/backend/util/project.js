const axios = require("axios");
const { Pool, Client } = require("pg");
const { response } = require("express");
const pool = new Pool();

// Importing models
const HttpError = require("../models/http-error");
const Project = require("../models/project");

// Importing tools
const event_tools = require("./event");

// Function that inserts new project to database, and initiates insertion of project groups and project groups members. Also returns whole project object with id's from database
async function addProject(project, user_id) {
  const response = await pool.query(
    "INSERT INTO projects(user_id, project_title, project_creation_date, project_last_updated, project_status, project_length) VALUES ($1, $2, current_timestamp, current_timestamp, $3, $4) RETURNING *",
    [
      user_id,
      project.project_title,
      project.project_status,
      project.project_length,
    ]
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
    data.rows[0].project_status,
    data.rows[0].project_length
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
    "INSERT INTO project_group_members(group_id, member_name) VALUES ($1, $2) RETURNING *",
    [group_id, member]
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

async function getProjects(user_id) {
  const response = await pool.query(
    "SELECT * FROM projects WHERE user_id = $1 ORDER BY id DESC",
    [user_id]
  );

  await pool.end;

  const data = response.rows;

  if (!data) {
    const error = new HttpError("No projects found.", 404);
    throw error;
  }

  return data;
}

async function getProject(project_id) {
  // Getting general information about project
  const response = await pool.query("SELECT * FROM projects WHERE id = $1", [
    project_id,
  ]);

  await pool.end;

  const data = response.rows[0];

  if (!data) {
    const error = new HttpError("No project with that id. Not found.", 404);
    throw error;
  }

  const project_data = new Project(
    data.id,
    data.project_title,
    data.project_creation_date,
    data.project_status,
    data.project_length
  );

  // Getting groups data
  let groups;
  try {
    groups = await getProjectGroups(project_id);
  } catch (error) {
    throw error;
  }

  project_data.addGroups(groups);

  // Getting events for this project
  let events;
  try {
    events = await event_tools.getEvents(project_id);
  } catch (error) {
    throw error;
  }

  if (events) {
    project_data.addEvents(events);
  }

  return project_data;
}

async function getProjectGroups(project_id) {
  const response = await pool.query(
    "SELECT * FROM project_groups WHERE project_id = $1",
    [project_id]
  );

  await pool.end;

  const groups = response.rows;

  let groups_data = await Promise.all(
    groups.map(async (group) => {
      let group_data;

      try {
        group_data = await getGroupMembers(group.id);
      } catch (error) {
        throw error;
      }

      group.group_members = group_data;
      return group;
    })
  );

  return groups_data;
}

async function getGroupMembers(group_id) {
  const response = await pool.query(
    "SELECT * FROM project_group_members WHERE group_id = $1",
    [group_id]
  );

  await pool.end;

  const members = response.rows;

  if (!members) {
    return [];
  } else {
    return members;
  }
}

async function shareProject(donor_id, recipient_email, project_id) {
  const recipient_cleaned_email = recipient_email.trim();
  const recipient_response = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [recipient_cleaned_email]
  );

  await pool.end;

  let recipient_id;
  if (recipient_response.rows.length > 1) {
    const error = new HttpError("Multiple users with thiis email.", 404);
    throw error;
  } else if (recipient_response.rows.length === 0) {
    const error = new HttpError("No user found.", 404);
    throw error;
  } else {
    recipient_id = recipient_response.rows[0].id;
  }

  if (donor_id === recipient_id) {
    const error = new HttpError("You cannot share project with yourself.", 400);
    throw error;
  }

  const project_share_response = await pool.query(
    "INSERT INTO shared_projects(project_id, donor_id, recipient_id) VALUES ($1, $2, $3) RETURNING *",
    [project_id, donor_id, recipient_id]
  );

  await pool.end;

  return true;
}

async function getSharedProjects(user_id) {
  let projects = [];
  let shared_projects_user_ids = [];
  let email_by_id;

  const ids_response = await pool.query(
    "SELECT project_id FROM shared_projects WHERE recipient_id = $1",
    [user_id]
  );

  await pool.end;

  shared_projects_user_ids = ids_response.rows;

  if (shared_projects_user_ids.length === 0) {
    return projects;
  }

  projects = await Promise.all(
    shared_projects_user_ids.map(async (id) => {
      let project_data;
      let response;

      try {
        response = await pool.query("SELECT * FROM projects WHERE id = $1", [
          id.project_id
        ]);

        let donor = response.rows[0].user_id
      
        const email_response = await pool.query("SELECT email FROM users WHERE id = $1", [
          donor,
        ]);
        await pool.end;
      
        email_by_id = email_response.rows[0].email;
      } catch (error) {
        return next(error);
      }

      await pool.end;

      project_data = response.rows[0];
      project_data.email = email_by_id;

      return await project_data;
    })
  );
  return projects;
}

module.exports = {
  addProject,
  getProjects,
  getProject,
  shareProject,
  getSharedProjects,
};
