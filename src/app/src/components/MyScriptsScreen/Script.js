import React, { useEffect, useState } from "react";

// Bootstrap
import { ListGroup, Badge, Button } from "react-bootstrap";

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
            {project.project_status}
          </div>

          <div className={styles.buttons_container}>
            <Badge bg="primary" pill className={styles.badge}>
              {project.project_last_updated.split("T")[0]}
            </Badge>
            <Button variant="primary" className={styles.button_first}>
              Edit
            </Button>
            <Button variant="primary">Export</Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Script;
