import React, { useEffect, useState, useContext } from "react";
import { useDrop } from "react-dnd";
import BuildScriptTimeline from "./BuildScriptTimeline";

import styles from "./BuildScriptWindow.module.css";

import Event from "../Event/Event";
import EventContainer from "./EventContainer";

// Context
import ProjectContext from "../../../context/ProjectContext";

const BuildScriptWindow = (props) => {
  // Context for project
  const { project, setProject } = useContext(ProjectContext);

  let events = [];
  for (let i = 0; i < props.numberOfDepartments; i++) {
    events[i] = [];
    for (let j = 0; j < props.numberOfElements; j++) {
      events[i].push({
        ui_id: j,
        group_id: project.groups[i].group_id,
        event_time: j + 1 * 10,
      });
    }
  }

  return (
    <div className={styles.window}>
      <BuildScriptTimeline time={project.project_length}></BuildScriptTimeline>
      <div className={styles.table}>
        {project.groups.reverse().map((group, index) => (
          <div className={styles.row} key={Math.random()}>
            {events[index].map((event) => (
              <div className={styles.event_container} key={Math.random()}>
                <EventContainer event={event}></EventContainer>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildScriptWindow;
