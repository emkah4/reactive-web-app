import React from "react";
import BuildScriptDepartments from "./BuildScriptDepartments";
import BuildScriptTimeline from "./BuildScriptTimeline";
import BuildScriptTools from "./BuildScriptTools";
import BuildScriptWindow from "./BuildScriptWindow";

import styles from "./BuildScriptMain.module.css";

const BuildScriptMain = (props) => {
  const LIST_OF_DEPARTMENTS_MOCK = [
    {
      id: "dept1",
      dept_name: "Developers",
      dept_people: ["Todd", "Matthew", "Stephan"],
    },
    {
      id: "dept2",
      dept_name: "Managers",
      dept_people: ["Lat", "Kat", "Sat"],
    },
    {
      id: "dept2",
      dept_name: "Managers",
      dept_people: ["Lat", "Kat", "Sat", "Todd", "Matthew", "Stephan", "Todd", "Matthew", "Stephan", "Todd", "Matthew", "Stephan"],
    },
  ];

  const timeline = 4

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.title}>Groups</div>
        <BuildScriptDepartments dept_data={LIST_OF_DEPARTMENTS_MOCK}></BuildScriptDepartments>
        <BuildScriptTimeline timeline={timeline}></BuildScriptTimeline>
        <BuildScriptWindow></BuildScriptWindow>
        <div className={styles.title}>Add event</div>
        <BuildScriptTools></BuildScriptTools>
      </div>
    </React.Fragment>
  );
};

export default BuildScriptMain;
