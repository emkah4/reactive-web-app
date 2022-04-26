import React from "react";

import styles from "./ScriptLi.module.css";

const ScriptLi = (props) => {
  console.log(props);
  return (
    <div>
      {console.log(props)}
      <p>LOL</p>
      <li className={styles.li}>{props.project.project_title}</li>
    </div>
  );
};

export default ScriptLi;
