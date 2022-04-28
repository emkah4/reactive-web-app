import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"
import BuildScriptDepartments from "./BuildScriptDepartments";
import BuildScriptTimeline from "./BuildScriptTimeline";
import BuildScriptTools from "./BuildScriptTools";
import BuildScriptWindow from "./BuildScriptWindow";
import BuildScreenInitial from "../BuildScriptInitial/BuildScriptInitial";

import styles from "./BuildScriptMain.module.css";
import { parsePath } from "react-router-dom";

const BuildScriptMain = (props) => {

  const listOfDepartments = props.list_of_departments
  const elementNo = parseInt(props.duration) / 10;
  const deptNo = parseInt(props.list_of_departments.length);
  

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.structure}>
        <div className={styles.script_title}>
          Editing exercise script{" "}
          <span className={styles.script_name}>{props.exercise_title}</span>
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
  );
};

export default BuildScriptMain;
