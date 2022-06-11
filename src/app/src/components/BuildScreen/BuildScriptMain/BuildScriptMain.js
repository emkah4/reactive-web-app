import React, { useEffect, useContext, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BuildScriptDepartments from "./BuildScriptDepartments";
import BuildScriptTimeline from "./BuildScriptTimeline";
import BuildScriptTools from "./BuildScriptTools";
import BuildScriptWindow from "./BuildScriptWindow";
import BuildScreenInitial from "../BuildScriptInitial/BuildScriptInitial";
import { parsePath } from "react-router-dom";
import { Button } from "react-bootstrap";

// Styles
import styles from "./BuildScriptMain.module.css";

// Context
import ProjectContext from "../../../context/ProjectContext";

const BuildScriptMain = (props) => {
  // Context for project
  const { project, setProject } = useContext(ProjectContext);

  const listOfDepartments = project.groups;
  const elementNo = parseInt(project.project_length) / 10;
  const deptNo = parseInt(project.groups.length);

  return (
    <div className={styles.main_container}>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.structure}>
          <div className={styles.script_title}>
            Editing exercise script{" "}
            <span className={styles.script_name}>{project.project_title}</span>
          </div>
          <div className={styles.container}>
            <div className={styles.title}>Groups</div>
            <BuildScriptDepartments
              dept_data={listOfDepartments}
            ></BuildScriptDepartments>
            <BuildScriptWindow
              numberOfElements={elementNo}
              numberOfDepartments={deptNo}
            ></BuildScriptWindow>
            <div className={styles.title}>Add event</div>
            <BuildScriptTools></BuildScriptTools>
          </div>
        </div>
      </DndProvider>
      <div className={styles.button_container}>
        <Button variant="success" onClick={() => props.onClose()}>
          Save and close project
        </Button>
      </div>
    </div>
  );
};

export default BuildScriptMain;
