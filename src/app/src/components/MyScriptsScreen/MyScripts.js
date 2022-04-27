import React from "react";

import styles from "./MyScripts.module.css";

import ScriptLi from "./ScriptLi";

const PROJECTS = [
  {
    id: 76,
    user_id: 6,
    project_title: "First project ever",
    project_creation_date: "2022-04-19T05:18:24.142Z",
    project_last_updated: "2022-04-19T05:18:24.142Z",
    project_status: "Not done at all",
  },
  {
    id: 75,
    user_id: 6,
    project_title: "First project ever",
    project_creation_date: "2022-04-17T18:31:03.775Z",
    project_last_updated: "2022-04-17T18:31:03.775Z",
    project_status: "Not done at all",
  },
];

const MyScripts = (props) => {
  return (
    <div className={styles.container}>
      {PROJECTS.map((project) => {
        <ScriptLi project={project} />;
      })}
    </div>
  );
};

export default MyScripts;
