import React from "react";

// Bootstrap
import { ListGroup, Badge, Button } from "react-bootstrap";

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
            <Link to="/create_a_script" className="primary">
              <Button
                variant="primary"
                className={styles.button_first}
                onClick={props.edit}
                value={project.id}
              >
                Edit
              </Button>
            </Link>
            <Button variant="primary" onClick={props.export} value={project.id}>
              Export
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Script;
