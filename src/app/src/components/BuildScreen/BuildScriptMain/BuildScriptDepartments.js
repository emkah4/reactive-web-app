import React, { useContext } from "react";

// Context
import ProjectContext from "../../../context/ProjectContext";

import styles from "./BuildScriptDepartments.module.css";

const BuildScriptDepartments = (props) => {
  // Context for project
  const { project, setProject } = useContext(ProjectContext);
  return (
    <div className={styles.departments}>
      {project.groups.map((group) => (
        <div className={styles.department} key={group.group_id}>
          {group.group_title}
          <br />{" "}
          {group.group_members.map((member) => (
            <p key={Math.random()} className={styles.person}>
              {member.member_name}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BuildScriptDepartments;
