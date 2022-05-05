import React from "react";

import styles from "./BuildScriptTimeline.module.css";

const BuildScriptTimeline = (props) => {
  let timeLine = [];
  for (let i = 0; i < props.time; i = i + 10) {
    timeLine.push(i);
  }

  return (
    <div className={styles.timeline_container}>
      {timeLine.map((time) => (
        <div className={styles.section} key={time}>
          {time}min
        </div>
      ))}
    </div>
  );
};

export default BuildScriptTimeline;
