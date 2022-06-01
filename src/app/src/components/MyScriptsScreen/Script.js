import React from "react";

// Bootstrap
import {
  ListGroup,
  Badge,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

import { Link } from "react-router-dom";

// Styles
import styles from "./Script.module.css";

const Script = (props) => {
  if (props.projects.length === 0) {
  }

  return (
    <ListGroup as="ol" numbered>
      {props.projects.map((project) => (
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
          key={project.id}
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{project.project_title}</div>
            Project status: {project.project_status}
            <div>Project length: {project.project_length} min</div>
          </div>

          <div className={styles.buttons_container}>
            <Badge bg="primary" pill className={styles.badge}>
              {project.project_last_updated.split("T")[0]}
            </Badge>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Options
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Header>Manage project</Dropdown.Header>
                <Dropdown.Item
                  as="button"
                  value={project.id}
                  onClick={props.edit}
                >
                  Edit
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={props.export}
                  value={project.id}
                >
                  Export
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  value={project.id}
                  onClick={props.delete}
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Script;
